package com.reliefsync.backend.controller;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reliefsync.backend.model.Role;
import com.reliefsync.backend.model.User;
import com.reliefsync.backend.repository.IncidentRepository;
import com.reliefsync.backend.repository.UserRepository;
import com.reliefsync.backend.security.JwtService;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class IncidentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    private static final String USER_EMAIL = "user@reliefsync.com";
    private static final String ADMIN_EMAIL = "admin@reliefsync.com";
    private static final String PASSWORD = "Password123";

    @BeforeEach
    void setUp() {
        incidentRepository.deleteAll();
        userRepository.deleteAll();
        userRepository.save(buildUser("Standard User", USER_EMAIL, Role.ROLE_USER));
        userRepository.save(buildUser("System Admin", ADMIN_EMAIL, Role.ROLE_ADMIN));
    }

    @Test
    void createIncidentShouldReturn201ForAuthenticatedUser() throws Exception {
        String token = tokenFor(USER_EMAIL);

        mockMvc.perform(post("/incidents")
                        .with(csrf())
                        .header("Authorization", bearer(token))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Bridge collapse risk",
                                  "description": "Structural damage reported after heavy rainfall.",
                                  "severity": "HIGH",
                                  "location": "Sector 9 Bridge",
                                  "status": "REPORTED"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Bridge collapse risk"))
                .andExpect(jsonPath("$.createdByEmail").value(USER_EMAIL))
                .andExpect(jsonPath("$.status").value("REPORTED"));
    }

    @Test
    void listIncidentsShouldSupportPaginationAndSorting() throws Exception {
        String token = tokenFor(USER_EMAIL);
        createIncident("Zeta Incident", "First description", "LOW", "Zone A", token);
        createIncident("Alpha Incident", "Second description", "CRITICAL", "Zone B", token);

        mockMvc.perform(get("/incidents")
                        .header("Authorization", bearer(token))
                        .param("page", "0")
                        .param("size", "1")
                        .param("sort", "title,asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].title").value("Alpha Incident"))
                .andExpect(jsonPath("$.size").value(1))
                .andExpect(jsonPath("$.totalElements").value(2));
    }

    @Test
    void getIncidentByIdShouldReturn200ForAuthenticatedUser() throws Exception {
        String token = tokenFor(USER_EMAIL);
        Long incidentId = createIncident("Medical supply shortage", "Need oxygen cylinders urgently.", "CRITICAL", "Ward 4", token);

        mockMvc.perform(get("/incidents/{id}", incidentId)
                        .header("Authorization", bearer(token)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(incidentId))
                .andExpect(jsonPath("$.severity").value("CRITICAL"));
    }

    @Test
    void updateIncidentShouldReturn200ForAuthenticatedUser() throws Exception {
        String token = tokenFor(USER_EMAIL);
        Long incidentId = createIncident("Flood warning", "Initial alert issued.", "MEDIUM", "North Basin", token);

        mockMvc.perform(put("/incidents/{id}", incidentId)
                        .with(csrf())
                        .header("Authorization", bearer(token))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "Flood emergency",
                                  "description": "Water level crossed the critical threshold.",
                                  "severity": "CRITICAL",
                                  "location": "North Basin",
                                  "status": "IN_PROGRESS"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Flood emergency"))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    @Test
    void deleteIncidentShouldReturn204ForAdmin() throws Exception {
        String userToken = tokenFor(USER_EMAIL);
        String adminToken = tokenFor(ADMIN_EMAIL);
        Long incidentId = createIncident("Road blockade", "Trees are blocking the highway.", "HIGH", "Highway 12", userToken);

        mockMvc.perform(delete("/incidents/{id}", incidentId)
                        .with(csrf())
                        .header("Authorization", bearer(adminToken)))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteIncidentShouldReturn403ForNonAdminUser() throws Exception {
        String userToken = tokenFor(USER_EMAIL);
        Long incidentId = createIncident("Communication outage", "Cell towers are down.", "MEDIUM", "East Grid", userToken);

        mockMvc.perform(delete("/incidents/{id}", incidentId)
                        .with(csrf())
                        .header("Authorization", bearer(userToken)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Access denied"));
    }

    @Test
    void protectedRoutesShouldReturn401WithoutJwt() throws Exception {
        mockMvc.perform(get("/incidents"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Authentication is required to access this resource"));
    }

    @Test
    void getIncidentByIdShouldReturn404WhenIncidentDoesNotExist() throws Exception {
        String token = tokenFor(USER_EMAIL);

        mockMvc.perform(get("/incidents/{id}", 9999L)
                        .header("Authorization", bearer(token)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Incident not found with id: 9999"));
    }

    @ParameterizedTest
    @MethodSource("invalidIncidentPayloads")
    void createIncidentShouldReturn400ForValidationErrors(String payload, String fieldName) throws Exception {
        String token = tokenFor(USER_EMAIL);

        mockMvc.perform(post("/incidents")
                        .with(csrf())
                        .header("Authorization", bearer(token))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.details." + fieldName).exists());
    }

    @Test
    void swaggerUiShouldBeAccessibleWithoutAuthentication() throws Exception {
        mockMvc.perform(get("/swagger-ui.html"))
                .andExpect(status().isFound());
    }

    private static Stream<Arguments> invalidIncidentPayloads() {
        return Stream.of(
                Arguments.of("""
                        {
                          "description": "Description present",
                          "severity": "HIGH",
                          "location": "Zone A"
                        }
                        """, "title"),
                Arguments.of("""
                        {
                          "title": "Title present",
                          "severity": "HIGH",
                          "location": "Zone A"
                        }
                        """, "description"),
                Arguments.of("""
                        {
                          "title": "Title present",
                          "description": "Description present",
                          "location": "Zone A"
                        }
                        """, "severity"),
                Arguments.of("""
                        {
                          "title": "Title present",
                          "description": "Description present",
                          "severity": "HIGH"
                        }
                        """, "location")
        );
    }

    private User buildUser(String fullName, String email, Role role) {
        return User.builder()
                .fullName(fullName)
                .email(email)
                .password(passwordEncoder.encode(PASSWORD))
                .role(role)
                .enabled(true)
                .build();
    }

    private String tokenFor(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found for token generation: " + email));
        return jwtService.generateToken(user);
    }

    private Long createIncident(String title, String description, String severity, String location, String token) throws Exception {
        MvcResult result = mockMvc.perform(post("/incidents")
                        .with(csrf())
                        .header("Authorization", bearer(token))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "title": "%s",
                                  "description": "%s",
                                  "severity": "%s",
                                  "location": "%s",
                                  "status": "REPORTED"
                                }
                                """.formatted(title, description, severity, location)))
                .andExpect(status().isCreated())
                .andReturn();

        JsonNode node = objectMapper.readTree(result.getResponse().getContentAsString());
        return node.get("id").asLong();
    }

    private String bearer(String token) {
        return "Bearer " + token;
    }
}

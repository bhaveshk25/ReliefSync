package com.reliefsync.backend.ai.controller;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.dto.AnalysisPriority;
import com.reliefsync.backend.ai.service.AIClient;
import com.reliefsync.backend.ai.service.AIClientException;
import com.reliefsync.backend.model.Role;
import com.reliefsync.backend.model.User;
import com.reliefsync.backend.model.IncidentSeverity;
import com.reliefsync.backend.repository.IncidentRepository;
import com.reliefsync.backend.repository.UserRepository;
import com.reliefsync.backend.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AIAnalysisControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @MockBean
    private AIClient aiClient;

    private static final String USER_EMAIL = "ai-user@reliefsync.com";

    @BeforeEach
    void setUp() {
        incidentRepository.deleteAll();
        userRepository.deleteAll();
        userRepository.save(User.builder()
                .fullName("AI User")
                .email(USER_EMAIL)
                .password(passwordEncoder.encode("Password123"))
                .role(Role.ROLE_USER)
                .enabled(true)
                .build());
    }

    @Test
    void analyzeShouldReturnAiResponseForAuthenticatedUser() throws Exception {
        when(aiClient.analyzeEmergency(anyString())).thenReturn(AIAnalysisResponse.builder()
                .severity(IncidentSeverity.CRITICAL)
                .priority(AnalysisPriority.URGENT)
                .recommendedResources(List.of("Medical Team", "Rescue Boats", "Food Supply"))
                .summary("Severe flooding detected requiring immediate evacuation and emergency response.")
                .build());

        mockMvc.perform(post("/ai/analyze")
                        .with(csrf())
                        .header("Authorization", bearer(tokenFor(USER_EMAIL)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "description": "Flood water rising rapidly near residential area"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.severity").value("CRITICAL"))
                .andExpect(jsonPath("$.priority").value("URGENT"))
                .andExpect(jsonPath("$.recommendedResources[0]").value("Medical Team"));
    }

    @Test
    void analyzeShouldReturnFallbackResponseWhenAiClientFails() throws Exception {
        when(aiClient.analyzeEmergency(anyString())).thenThrow(new AIClientException("Request timed out"));

        mockMvc.perform(post("/ai/analyze")
                        .with(csrf())
                        .header("Authorization", bearer(tokenFor(USER_EMAIL)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "description": "Flood water rising rapidly near residential area"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.severity").value("CRITICAL"))
                .andExpect(jsonPath("$.priority").value("URGENT"))
                .andExpect(jsonPath("$.recommendedResources").isArray());
    }

    @Test
    void analyzeShouldReturn400WhenDescriptionIsMissing() throws Exception {
        mockMvc.perform(post("/ai/analyze")
                        .with(csrf())
                        .header("Authorization", bearer(tokenFor(USER_EMAIL)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.details.description").exists());
    }

    @Test
    void analyzeShouldReturn401WhenJwtIsMissing() throws Exception {
        mockMvc.perform(post("/ai/analyze")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "description": "Flood water rising rapidly near residential area"
                                }
                                """))
                .andExpect(status().isUnauthorized());
    }

    private String tokenFor(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("User not found for token generation: " + email));
        return jwtService.generateToken(user);
    }

    private String bearer(String token) {
        return "Bearer " + token;
    }
}

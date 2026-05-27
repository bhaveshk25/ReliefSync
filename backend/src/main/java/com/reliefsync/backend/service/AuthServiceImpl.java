package com.reliefsync.backend.service;

import com.reliefsync.backend.dto.AuthResponse;
import com.reliefsync.backend.dto.LoginRequest;
import com.reliefsync.backend.dto.RegisterRequest;
import com.reliefsync.backend.exception.ResourceAlreadyExistsException;
import com.reliefsync.backend.model.Role;
import com.reliefsync.backend.model.User;
import com.reliefsync.backend.security.JwtService;
import java.time.Instant;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());
        log.info("Register request received for email={}", normalizedEmail);
        if (userService.existsByEmail(normalizedEmail)) {
            log.warn("Registration blocked because email is already registered: {}", normalizedEmail);
            throw new ResourceAlreadyExistsException("Email is already registered");
        }
        if (request.getRole() == Role.ROLE_ADMIN) {
            log.warn("Registration blocked due to attempted admin self-assignment: {}", normalizedEmail);
            throw new IllegalArgumentException("Public registration cannot assign administrator access");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(normalizedEmail)
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .enabled(true)
                .build();

        User savedUser = userService.save(user);
        log.info("User registered successfully with id={} and role={}", savedUser.getId(), savedUser.getRole());
        String token = jwtService.generateToken(savedUser);
        return buildAuthResponse(savedUser, token);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());
        log.info("Login request received for email={}", normalizedEmail);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );
        } catch (Exception ex) {
            log.warn("Login failed for email={}", normalizedEmail);
            throw new BadCredentialsException("Invalid email or password");
        }

        User user = userService.findByEmail(normalizedEmail)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        log.info("Login successful for user id={}", user.getId());
        String token = jwtService.generateToken(user);
        return buildAuthResponse(user, token);
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        Instant expiresAt = jwtService.extractExpiration(token);
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .expiresAt(expiresAt)
                .build();
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}

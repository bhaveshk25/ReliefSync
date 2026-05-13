package com.reliefsync.backend.dto;

import com.reliefsync.backend.model.Role;
import java.time.Instant;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private final String token;
    private final String tokenType;
    private final Long userId;
    private final String fullName;
    private final String email;
    private final Role role;
    private final Instant expiresAt;
}

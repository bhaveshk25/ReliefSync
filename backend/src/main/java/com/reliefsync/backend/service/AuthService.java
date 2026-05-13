package com.reliefsync.backend.service;

import com.reliefsync.backend.dto.AuthResponse;
import com.reliefsync.backend.dto.LoginRequest;
import com.reliefsync.backend.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}

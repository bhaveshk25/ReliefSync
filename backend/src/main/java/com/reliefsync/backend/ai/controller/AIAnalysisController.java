package com.reliefsync.backend.ai.controller;

import com.reliefsync.backend.ai.dto.AIAnalysisRequest;
import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.service.AIAnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AIAnalysisController {

    private final AIAnalysisService aiAnalysisService;

    @PostMapping("/analyze")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Analyze an emergency description with AI assistance")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Analysis completed successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request payload"),
            @ApiResponse(responseCode = "401", description = "Authentication required")
    })
    public ResponseEntity<AIAnalysisResponse> analyze(@Valid @RequestBody AIAnalysisRequest request) {
        return ResponseEntity.ok(aiAnalysisService.analyze(request.getDescription().trim()));
    }
}

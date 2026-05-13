package com.reliefsync.backend.ai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIAnalysisRequest {

    @NotBlank(message = "Description is required")
    @Size(max = 4000, message = "Description must not exceed 4000 characters")
    private String description;
}

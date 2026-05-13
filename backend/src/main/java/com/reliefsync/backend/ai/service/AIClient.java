package com.reliefsync.backend.ai.service;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;

public interface AIClient {

    AIAnalysisResponse analyzeEmergency(String description);
}

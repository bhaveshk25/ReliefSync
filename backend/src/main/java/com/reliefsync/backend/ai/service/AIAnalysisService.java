package com.reliefsync.backend.ai.service;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;

public interface AIAnalysisService {

    AIAnalysisResponse analyze(String description);
}

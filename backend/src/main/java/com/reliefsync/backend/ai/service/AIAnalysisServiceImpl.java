package com.reliefsync.backend.ai.service;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIAnalysisServiceImpl implements AIAnalysisService {

    private final AIClient aiClient;
    private final RuleBasedEmergencyAnalyzer ruleBasedEmergencyAnalyzer;

    @Override
    public AIAnalysisResponse analyze(String description) {
        try {
            return aiClient.analyzeEmergency(description);
        } catch (AIClientException ex) {
            log.warn("AI analysis failed, using rule-based fallback: {}", ex.getMessage());
            return ruleBasedEmergencyAnalyzer.analyze(description);
        }
    }
}

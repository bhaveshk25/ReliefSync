package com.reliefsync.backend.ai.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.dto.AnalysisPriority;
import com.reliefsync.backend.model.IncidentSeverity;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AIAnalysisServiceImplTest {

    @Mock
    private AIClient aiClient;

    private AIAnalysisServiceImpl aiAnalysisService;

    @BeforeEach
    void setUp() {
        aiAnalysisService = new AIAnalysisServiceImpl(aiClient, new RuleBasedEmergencyAnalyzer());
    }

    @Test
    void shouldReturnAiResponseWhenAiCallSucceeds() {
        AIAnalysisResponse aiResponse = AIAnalysisResponse.builder()
                .severity(IncidentSeverity.CRITICAL)
                .priority(AnalysisPriority.URGENT)
                .recommendedResources(List.of("Medical Team", "Rescue Boats", "Food Supply"))
                .summary("Severe flooding detected requiring immediate evacuation and emergency response.")
                .build();
        when(aiClient.analyzeEmergency("Flood water rising rapidly near residential area")).thenReturn(aiResponse);

        AIAnalysisResponse response = aiAnalysisService.analyze("Flood water rising rapidly near residential area");

        assertEquals(IncidentSeverity.CRITICAL, response.getSeverity());
        assertEquals(AnalysisPriority.URGENT, response.getPriority());
        assertEquals(3, response.getRecommendedResources().size());
    }

    @Test
    void shouldReturnFallbackResponseWhenAiTimesOut() {
        when(aiClient.analyzeEmergency("Flood water rising rapidly near residential area"))
                .thenThrow(new AIClientException("Request timed out"));

        AIAnalysisResponse response = aiAnalysisService.analyze("Flood water rising rapidly near residential area");

        assertEquals(IncidentSeverity.CRITICAL, response.getSeverity());
        assertEquals(AnalysisPriority.URGENT, response.getPriority());
        assertFalse(response.getRecommendedResources().isEmpty());
    }

    @Test
    void shouldReturnFallbackResponseWhenAiClientFails() {
        when(aiClient.analyzeEmergency("Fire and smoke spreading near residential area"))
                .thenThrow(new AIClientException("Provider unavailable"));

        AIAnalysisResponse response = aiAnalysisService.analyze("Fire and smoke spreading near residential area");

        assertEquals(IncidentSeverity.HIGH, response.getSeverity());
        assertEquals(AnalysisPriority.HIGH, response.getPriority());
        assertFalse(response.getSummary().isBlank());
    }
}

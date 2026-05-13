package com.reliefsync.backend.ai.dto;

import com.reliefsync.backend.model.IncidentSeverity;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AIAnalysisResponse {

    private final IncidentSeverity severity;
    private final AnalysisPriority priority;
    private final List<String> recommendedResources;
    private final String summary;
}

package com.reliefsync.backend.ai.service;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.dto.AnalysisPriority;
import com.reliefsync.backend.model.IncidentSeverity;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import org.springframework.stereotype.Component;

@Component
public class RuleBasedEmergencyAnalyzer {

    public AIAnalysisResponse analyze(String description) {
        String normalizedDescription = description.toLowerCase(Locale.ROOT);
        IncidentSeverity severity = determineSeverity(normalizedDescription);
        AnalysisPriority priority = determinePriority(severity);
        List<String> resources = determineResources(normalizedDescription, severity);
        String summary = buildSummary(normalizedDescription, severity);

        return AIAnalysisResponse.builder()
                .severity(severity)
                .priority(priority)
                .recommendedResources(resources)
                .summary(summary)
                .build();
    }

    private IncidentSeverity determineSeverity(String description) {
        int score = 0;
        if (containsAny(description, "critical", "collapse", "trapped", "rapidly", "explosion", "wildfire")) {
            score += 3;
        }
        if (containsAny(description, "flood", "earthquake", "fire", "landslide", "injured", "evacuation")) {
            score += 2;
        }
        if (containsAny(description, "residential", "hospital", "school", "bridge", "power outage")) {
            score += 1;
        }

        if (score >= 5) {
            return IncidentSeverity.CRITICAL;
        }
        if (score >= 3) {
            return IncidentSeverity.HIGH;
        }
        if (score >= 2) {
            return IncidentSeverity.MEDIUM;
        }
        return IncidentSeverity.LOW;
    }

    private AnalysisPriority determinePriority(IncidentSeverity severity) {
        return switch (severity) {
            case CRITICAL -> AnalysisPriority.URGENT;
            case HIGH -> AnalysisPriority.HIGH;
            case MEDIUM -> AnalysisPriority.MEDIUM;
            case LOW -> AnalysisPriority.LOW;
        };
    }

    private List<String> determineResources(String description, IncidentSeverity severity) {
        Set<String> resources = new LinkedHashSet<>();

        if (containsAny(description, "flood", "water", "river", "boat")) {
            resources.add("Rescue Boats");
            resources.add("Evacuation Team");
        }
        if (containsAny(description, "injured", "medical", "hospital", "casualties")) {
            resources.add("Medical Team");
            resources.add("Ambulances");
        }
        if (containsAny(description, "fire", "wildfire", "smoke", "explosion")) {
            resources.add("Fire Response Unit");
        }
        if (containsAny(description, "food", "shelter", "evacuation", "residential")) {
            resources.add("Food Supply");
            resources.add("Temporary Shelter");
        }

        if (severity == IncidentSeverity.CRITICAL || severity == IncidentSeverity.HIGH) {
            resources.add("Emergency Command Unit");
        }

        if (resources.isEmpty()) {
            resources.add("Rapid Assessment Team");
            resources.add("Medical Team");
        }

        return new ArrayList<>(resources);
    }

    private String buildSummary(String description, IncidentSeverity severity) {
        return switch (severity) {
            case CRITICAL -> "Potentially life-threatening emergency detected. Immediate coordinated response is recommended.";
            case HIGH -> "High-impact emergency indicators detected. Fast response and field coordination are recommended.";
            case MEDIUM -> "Moderate emergency indicators detected. Situation should be assessed and monitored closely.";
            case LOW -> "Lower-severity emergency indicators detected. A field assessment is recommended.";
        };
    }

    private boolean containsAny(String value, String... keywords) {
        for (String keyword : keywords) {
            if (value.contains(keyword)) {
                return true;
            }
        }
        return false;
    }
}

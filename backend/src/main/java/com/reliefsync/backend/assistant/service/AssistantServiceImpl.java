package com.reliefsync.backend.assistant.service;

import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.service.AIAnalysisService;
import com.reliefsync.backend.assistant.dto.AssistantChatResponse;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssistantServiceImpl implements AssistantService {

    private final AIAnalysisService aiAnalysisService;

    @Override
    public AssistantChatResponse chat(String message) {
        String normalizedMessage = message.toLowerCase(Locale.ROOT);

        if (containsAny(normalizedMessage, "volunteer", "join", "help")) {
            return build("Create an account, head to the dashboard, review active incidents, and choose a live response lane that matches your skills and location.");
        }
        if (containsAny(normalizedMessage, "flood", "water rising")) {
            return build("Move to higher ground, avoid floodwater contact, keep emergency supplies sealed, and follow evacuation instructions from local authorities.");
        }
        if (containsAny(normalizedMessage, "request emergency help", "need help", "emergency help")) {
            return build("Use the incident reporting workflow to submit the emergency details, include location and severity, and monitor the dashboard for response updates.");
        }
        if (containsAny(normalizedMessage, "supplies", "needed", "resources")) {
            return build("Priority relief supplies usually include food packs, clean water, medical kits, blankets, sanitation supplies, and communication equipment.");
        }
        if (containsAny(normalizedMessage, "active emergencies", "where are")) {
            return build("Open the Incident Management page or India Heatmap to view active emergencies, severity levels, and the type of help currently needed.");
        }

        AIAnalysisResponse analysis = aiAnalysisService.analyze(message);
        String reply = String.format(
                "This situation appears %s with %s priority. Recommended support includes %s. Summary: %s",
                analysis.getSeverity().name().toLowerCase(Locale.ROOT),
                analysis.getPriority().name().toLowerCase(Locale.ROOT),
                String.join(", ", analysis.getRecommendedResources()),
                analysis.getSummary()
        );
        return build(reply);
    }

    private AssistantChatResponse build(String reply) {
        return AssistantChatResponse.builder().reply(reply).build();
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

package com.reliefsync.backend.ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reliefsync.backend.ai.dto.AIAnalysisResponse;
import com.reliefsync.backend.ai.dto.AnalysisPriority;
import com.reliefsync.backend.config.AIProperties;
import com.reliefsync.backend.model.IncidentSeverity;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class OpenAIAIClient implements AIClient {

    private final AIProperties aiProperties;
    private final ObjectMapper objectMapper;

    @Override
    public AIAnalysisResponse analyzeEmergency(String description) {
        AIProperties.OpenAi openAi = aiProperties.getOpenai();
        if (!openAi.isEnabled()) {
            throw new AIClientException("OpenAI integration is disabled");
        }
        if (!StringUtils.hasText(openAi.getApiKey())) {
            throw new AIClientException("OpenAI API key is not configured");
        }

        try {
            HttpClient httpClient = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofMillis(openAi.getTimeoutMs()))
                    .build();

            String requestBody = objectMapper.writeValueAsString(buildRequestPayload(description, openAi.getModel()));
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(openAi.getBaseUrl() + "/v1/chat/completions"))
                    .timeout(Duration.ofMillis(openAi.getTimeoutMs()))
                    .header("Authorization", "Bearer " + openAi.getApiKey())
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 400) {
                log.warn("OpenAI API returned error status {} with body {}", response.statusCode(), response.body());
                throw new AIClientException("OpenAI API returned status " + response.statusCode());
            }

            return parseResponse(response.body());
        } catch (AIClientException ex) {
            throw ex;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new AIClientException("OpenAI request was interrupted", ex);
        } catch (IOException | RuntimeException ex) {
            throw new AIClientException("Failed to communicate with OpenAI API", ex);
        }
    }

    private Object buildRequestPayload(String description, String model) {
        return new RequestPayload(
                model,
                List.of(
                        new Message(
                                "system",
                                "You are an emergency analysis assistant. Return only valid JSON with keys severity, priority, recommendedResources, summary. "
                                        + "Allowed severity values: LOW, MEDIUM, HIGH, CRITICAL. Allowed priority values: LOW, MEDIUM, HIGH, URGENT."
                        ),
                        new Message(
                                "user",
                                "Analyze this emergency description and return JSON only: " + description
                        )
                ),
                new ResponseFormat("json_object")
        );
    }

    private AIAnalysisResponse parseResponse(String responseBody) throws IOException {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode contentNode = root.path("choices").path(0).path("message").path("content");
        if (contentNode.isMissingNode() || contentNode.isNull()) {
            throw new AIClientException("OpenAI response did not include message content");
        }

        String normalizedJson = stripCodeFence(contentNode.asText());
        JsonNode analysisNode = objectMapper.readTree(normalizedJson);

        IncidentSeverity severity = IncidentSeverity.valueOf(analysisNode.path("severity").asText().toUpperCase(Locale.ROOT));
        AnalysisPriority priority = AnalysisPriority.valueOf(analysisNode.path("priority").asText().toUpperCase(Locale.ROOT));
        JsonNode resourcesNode = analysisNode.path("recommendedResources");
        if (!resourcesNode.isArray() || resourcesNode.isEmpty()) {
            throw new AIClientException("OpenAI response did not include recommended resources");
        }

        List<String> recommendedResources = objectMapper.convertValue(
                resourcesNode,
                objectMapper.getTypeFactory().constructCollectionType(List.class, String.class)
        );
        String summary = analysisNode.path("summary").asText();
        if (!StringUtils.hasText(summary)) {
            throw new AIClientException("OpenAI response did not include summary");
        }

        return AIAnalysisResponse.builder()
                .severity(severity)
                .priority(priority)
                .recommendedResources(recommendedResources)
                .summary(summary)
                .build();
    }

    private String stripCodeFence(String value) {
        String trimmed = value.trim();
        if (trimmed.startsWith("```")) {
            trimmed = trimmed.replaceFirst("^```json", "");
            trimmed = trimmed.replaceFirst("^```", "");
            trimmed = trimmed.replaceFirst("```$", "");
        }
        return trimmed.trim();
    }

    private record RequestPayload(String model, List<Message> messages, ResponseFormat response_format) {
    }

    private record Message(String role, String content) {
    }

    private record ResponseFormat(String type) {
    }
}

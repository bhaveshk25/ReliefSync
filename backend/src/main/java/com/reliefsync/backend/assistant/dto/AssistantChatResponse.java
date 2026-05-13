package com.reliefsync.backend.assistant.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AssistantChatResponse {

    private final String reply;
}

package com.reliefsync.backend.assistant.service;

import com.reliefsync.backend.assistant.dto.AssistantChatResponse;

public interface AssistantService {

    AssistantChatResponse chat(String message);
}

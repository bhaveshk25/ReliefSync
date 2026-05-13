package com.reliefsync.backend.config;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "app.ai")
public class AIProperties {

    private final OpenAi openai = new OpenAi();

    @Getter
    @Setter
    public static class OpenAi {

        private boolean enabled = true;

        private String apiKey;

        private String baseUrl = "https://api.openai.com";

        private String model = "gpt-4o-mini";

        @Min(1000)
        private int timeoutMs = 5000;
    }
}

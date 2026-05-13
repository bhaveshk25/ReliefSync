package com.reliefsync.backend.dto;

import com.reliefsync.backend.model.IncidentSeverity;
import com.reliefsync.backend.model.IncidentStatus;
import java.time.Instant;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IncidentResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final IncidentSeverity severity;
    private final String location;
    private final IncidentStatus status;
    private final Instant createdAt;
    private final Instant updatedAt;
    private final Long createdById;
    private final String createdByName;
    private final String createdByEmail;
}

package com.reliefsync.backend.service;

import com.reliefsync.backend.dto.IncidentRequest;
import com.reliefsync.backend.dto.IncidentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IncidentService {

    IncidentResponse createIncident(IncidentRequest request, String userEmail);

    Page<IncidentResponse> getIncidents(Pageable pageable);

    IncidentResponse getIncidentById(Long id);

    IncidentResponse updateIncident(Long id, IncidentRequest request);

    void deleteIncident(Long id);
}

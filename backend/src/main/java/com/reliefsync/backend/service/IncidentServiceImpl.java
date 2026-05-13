package com.reliefsync.backend.service;

import com.reliefsync.backend.dto.IncidentRequest;
import com.reliefsync.backend.dto.IncidentResponse;
import com.reliefsync.backend.exception.ResourceNotFoundException;
import com.reliefsync.backend.model.Incident;
import com.reliefsync.backend.model.IncidentStatus;
import com.reliefsync.backend.model.User;
import com.reliefsync.backend.repository.IncidentRepository;
import com.reliefsync.backend.repository.UserRepository;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IncidentServiceImpl implements IncidentService {

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public IncidentResponse createIncident(IncidentRequest request, String userEmail) {
        User creator = userRepository.findByEmail(normalizeEmail(userEmail))
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user was not found"));

        Incident incident = Incident.builder()
                .title(request.getTitle().trim())
                .description(request.getDescription().trim())
                .severity(request.getSeverity())
                .location(request.getLocation().trim())
                .status(resolveStatus(request.getStatus()))
                .createdBy(creator)
                .build();

        return mapToResponse(incidentRepository.save(incident));
    }

    @Override
    public Page<IncidentResponse> getIncidents(Pageable pageable) {
        return incidentRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Override
    public IncidentResponse getIncidentById(Long id) {
        return mapToResponse(findIncident(id));
    }

    @Override
    @Transactional
    public IncidentResponse updateIncident(Long id, IncidentRequest request) {
        Incident incident = findIncident(id);
        incident.setTitle(request.getTitle().trim());
        incident.setDescription(request.getDescription().trim());
        incident.setSeverity(request.getSeverity());
        incident.setLocation(request.getLocation().trim());
        incident.setStatus(resolveStatus(request.getStatus()));

        return mapToResponse(incidentRepository.save(incident));
    }

    @Override
    @Transactional
    public void deleteIncident(Long id) {
        Incident incident = findIncident(id);
        incidentRepository.delete(incident);
    }

    private Incident findIncident(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Incident not found with id: " + id));
    }

    private IncidentStatus resolveStatus(IncidentStatus requestedStatus) {
        return requestedStatus != null ? requestedStatus : IncidentStatus.REPORTED;
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private IncidentResponse mapToResponse(Incident incident) {
        return IncidentResponse.builder()
                .id(incident.getId())
                .title(incident.getTitle())
                .description(incident.getDescription())
                .severity(incident.getSeverity())
                .location(incident.getLocation())
                .status(incident.getStatus())
                .createdAt(incident.getCreatedAt())
                .updatedAt(incident.getUpdatedAt())
                .createdById(incident.getCreatedBy().getId())
                .createdByName(incident.getCreatedBy().getFullName())
                .createdByEmail(incident.getCreatedBy().getEmail())
                .build();
    }
}

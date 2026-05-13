package com.reliefsync.backend.repository;

import com.reliefsync.backend.model.Incident;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    @Override
    @EntityGraph(attributePaths = "createdBy")
    Page<Incident> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = "createdBy")
    Optional<Incident> findById(Long id);
}

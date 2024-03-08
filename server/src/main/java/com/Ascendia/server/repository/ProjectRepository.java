package com.Ascendia.server.repository;

import com.Ascendia.server.dto.ProjectManagerDto;

public interface ProjectRepository {
    ProjectManagerDto createProjectManager(ProjectManagerDto projectManagerDto);
}

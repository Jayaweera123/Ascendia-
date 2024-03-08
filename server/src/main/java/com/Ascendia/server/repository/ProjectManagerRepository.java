package com.Ascendia.server.repository;

import com.Ascendia.server.entity.Project.ProjectManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectManagerRepository  extends JpaRepository<ProjectManager, Long> {
}

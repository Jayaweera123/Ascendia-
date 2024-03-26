package com.Ascendia.server.repository.Project;

import com.Ascendia.server.entity.Project.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}

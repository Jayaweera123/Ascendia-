package com.Ascendia.server.repository;

import com.Ascendia.server.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long >{
}
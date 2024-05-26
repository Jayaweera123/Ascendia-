package com.Ascendia.server.repository.Project;

import com.Ascendia.server.entity.Project.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository  extends JpaRepository<Project, Long >{
    List<Project> findByPmId(Long pmId);
}

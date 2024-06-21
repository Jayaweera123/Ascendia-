package com.Ascendia.server.repository.Project;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository  extends JpaRepository<Project, Long >{

    @Query("SELECT p FROM Project p WHERE p.projectManager = :pmId")
    List<Project> findProjectsByProjectManagerId(@Param("pmId") Long pmId);

    List<Project> findProjectsByProjectManager(User projectManager);

    @Query(
            "SELECT p FROM Project p WHERE " +
                    "p.projectManager = :pmId AND " +
                    "(p.projectName LIKE CONCAT('%',:query, '%') OR " +
                    "p.projectDescription LIKE CONCAT('%',:query, '%'))")
    List<Project> searchProject(Long pmId, String query);
}

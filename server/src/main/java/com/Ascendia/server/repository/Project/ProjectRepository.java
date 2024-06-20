package com.Ascendia.server.repository.Project;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository  extends JpaRepository<Project, Long >{

    List<Project> findByPmId(String pmId);

    @Query(
            "SELECT p FROM Project p WHERE " +
                    "p.pmId = :pmId AND " +
                    "(p.projectName LIKE CONCAT('%',:query, '%') OR " +
                    "p.projectDescription LIKE CONCAT('%',:query, '%'))")
    List<Project> searchProject(String pmId, String query);
    Project findByProjectId(Long projectId);
    List<Project> findByProjectManager(User user);
    List<Project> findByStoreKeeper(User user);
    List<Project> findBySiteEngineer(User user);
    List<Project> findBySupervisor(User user);
    List<Project> findByTechnicalOfficer(User user);
    List<Project> findByQuantitySurveyor(User user);
}

package com.Ascendia.server.repository.Project;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository  extends JpaRepository<Project, Long >{

    //List<Project> findByPmId(String pmId);

    /*@Query(
            "SELECT p FROM Project p WHERE " +
                    "p.pmId = :pmId AND " +
                    "(p.projectName LIKE CONCAT('%',:query, '%') OR " +
                    "p.projectDescription LIKE CONCAT('%',:query, '%'))")
    List<Project> searchProject(String pmId, String query);*/

    @Query("SELECT p FROM Project p WHERE p.projectManager = :pmId")
    List<Project> findProjectsByProjectManagerId(@Param("pmId") Long pmId);

    List<Project> findProjectsByProjectManager(User projectManager);

    List<Project> findProjectsByClient(User client);
    List<Project> findProjectsByConsultant(User consultant);

    List<Project> findAllByActiveTrue();

    Project findByProjectId(Long projectId);

    List<Project> findByProjectManager(User user);

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Completed'")
    Long countCompletedProjects();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'In-Progress'")
    Long countInProgressProjects();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'Cancelled'")
    Long countCancelledProjects();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.projectStatus = 'pending'")
    Long countPendingProjects();

    @Query("SELECT YEAR(p.createdDate), COUNT(p) FROM Project p WHERE p.projectStatus = 'Completed' GROUP BY YEAR(p.createdDate)")
    List<Object[]> countCompletedProjectsByYear();

    @Query("SELECT YEAR(p.createdDate), COUNT(p) FROM Project p WHERE p.projectStatus = 'In-Progress' GROUP BY YEAR(p.createdDate)")
    List<Object[]> countInProgressProjectsByYear();

    @Query("SELECT YEAR(p.createdDate), COUNT(p) FROM Project p WHERE p.projectStatus = 'Cancelled' GROUP BY YEAR(p.createdDate)")
    List<Object[]> countCancelledProjectsByYear();

    @Query("SELECT YEAR(p.createdDate), COUNT(p) FROM Project p WHERE p.projectStatus = 'pending' GROUP BY YEAR(p.createdDate)")
    List<Object[]> countPendingProjectsByYear();

}

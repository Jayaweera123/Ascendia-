package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserProjectAssignmentRepository  extends JpaRepository<UserProjectAssignment, Long> {
    List<UserProjectAssignment> findByProjectProjectId(Long projectId);

    @Query("SELECT upa.project FROM UserProjectAssignment upa WHERE upa.assignedUser = :assignedUser")
    List<Project> findProjectsByAssignedUser(@Param("assignedUser") User assignedUser);

    @Query("SELECT assignment FROM UserProjectAssignment assignment WHERE " +
            "assignment.project.projectId = :projectId AND " +
            "(assignment.assignedUser.firstName LIKE %:query% OR " +
            "assignment.assignedUser.lastName LIKE %:query% OR " +
            "assignment.assignedUser.department LIKE %:query%)")
    List<UserProjectAssignment> searchAssignment(Long projectId, String query);

    @Query("SELECT COUNT(DISTINCT upa.assignedUser) FROM UserProjectAssignment upa WHERE upa.project.projectId = :projectId")
    Long countDistinctAssignedUsersByProjectId(@Param("projectId") Long projectId);



}

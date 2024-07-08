package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentHistoryRepository extends JpaRepository<AssignmentHistory, Long>{

    List<AssignmentHistory> findByProjectProjectId(Long projectId);

    @Query("SELECT record FROM AssignmentHistory record WHERE " +
            "record.project.projectId = :projectId AND " +
            "(record.assignedUser.firstName LIKE %:query% OR " +
            "record.assignedUser.lastName LIKE %:query%)")// +
            //"record.assignedUser.department LIKE %:query%)")
    List<AssignmentHistory> searchRecord(Long projectId, String query);
}

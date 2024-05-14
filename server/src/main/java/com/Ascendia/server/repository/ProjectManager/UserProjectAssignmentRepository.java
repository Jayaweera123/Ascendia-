package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProjectAssignmentRepository  extends JpaRepository<UserProjectAssignment, Long> {
    List<UserProjectAssignment> findByProjectProjectId(Long projectId);
}

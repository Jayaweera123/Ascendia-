package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentHistoryRepository extends JpaRepository<AssignmentHistory, Long>{

    List<AssignmentHistory> findByProjectProjectId(Long projectId);
}

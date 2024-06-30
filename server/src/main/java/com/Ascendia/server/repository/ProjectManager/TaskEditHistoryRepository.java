package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;
import com.Ascendia.server.entity.SiteManager.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskEditHistoryRepository extends JpaRepository<TaskEditHistory, Long> {

    List<TaskEditHistory> findByTaskTaskId(Long taskId);
}

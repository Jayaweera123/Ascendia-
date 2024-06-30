package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskEditHistoryRepository extends JpaRepository<TaskEditHistory, Long> {

}

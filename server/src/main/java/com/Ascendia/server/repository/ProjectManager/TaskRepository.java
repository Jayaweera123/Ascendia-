package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByProjectProjectId(Long projectId);



}

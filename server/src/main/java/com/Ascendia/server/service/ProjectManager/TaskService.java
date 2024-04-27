package com.Ascendia.server.service.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.repository.Project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    //TaskDto createTask(TaskDto taskDto);
    TaskDto createTask(TaskDto taskDto);

    TaskDto getTaskId(Long taskId);

    List<TaskDto> getAllTasks();

    TaskDto updateTask(Long taskId, TaskDto updateTask);

     void deleteTask(Long taskId);

    // TaskService.java
    void calculateStatus(TaskDto taskDto);

    List<TaskDto> getTasksByProjectId(Long projectId);

    int getJobCountForTask(Long taskId);


}

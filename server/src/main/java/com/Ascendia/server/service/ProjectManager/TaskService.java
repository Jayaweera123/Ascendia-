package com.Ascendia.server.service.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;

import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    TaskDto getTaskId(Long taskId);

    List<TaskDto> getAllTasks();

    TaskDto updateTask(Long taskId, TaskDto updateTask);

     void deleteTask(Long taskId);

    // TaskService.java
    void calculateStatus(TaskDto taskDto);

    List<TaskDto> getTasksByProjectId(Long projectId);



}

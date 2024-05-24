package com.Ascendia.server.service.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.mapper.Store.MaterialMapper;

import java.util.List;
import java.util.stream.Collectors;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    TaskDto getTaskId(Long taskId);

    List<TaskDto> getAllTasks();

    TaskDto updateTask(Long taskId, TaskDto updateTask);

     void deleteTaskById(Long taskId);

    // TaskService.java
    //void calculateStatus(TaskDto taskDto);

    List<TaskDto> getTasksByProjectId(Long projectId);

     int getJobCountForTask(Long taskId);

    String checkCompletionOrStatusUpdate(Long taskId);

    void updateTaskStatus(Long taskId);

    List<TaskDto> searchTask(Long projectId, String query);

    String calculateTimeDifference(TaskDto taskDto);




}

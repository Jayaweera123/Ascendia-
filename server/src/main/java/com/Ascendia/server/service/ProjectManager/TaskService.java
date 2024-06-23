package com.Ascendia.server.service.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.Task;

import java.util.List;

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

    int getCompletedJobCountForTask(Long taskId);

    String CheckCompletionUpdateStatus(Long taskId);

    String calculateStatus(Task task);

    boolean isCompleted(Long taskId);

    void markAsCompleted(Long taskId);

    void markAsUncompleted(Long taskId);

    void moveToInProgress(Long taskId);

    void updateTaskStatus(Long taskId);

    List<TaskDto> searchTask(Long projectId, String query);

    String calculateTimeDifference(TaskDto taskDto);

    //Ravindu
    int getTaskProgress(Long taskId);
    double calculateProjectProgress(Long projectId);






    //=============gimhan===============
    List<TaskDto> getTasksByScheduledStatus(Long projectId);

    List<TaskDto> getTasksByInProgresStatus(Long projectId);

}
package com.Ascendia.server.mapper.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.Task;
public class TaskMapper {
    public static TaskDto mapToTaskDto(Task task) {
        return new TaskDto(
                task.getTaskId(),
                task.getTaskName(),
                task.getDescription(),
                task.getStartDate(),
                task.getEndDate(),
                task.getStatus(),
                task.getProject()
        );
    }

    public static Task mapToTask(TaskDto taskDto) {
        return new Task (
                taskDto.getTaskId(),
                taskDto.getTaskName(),
                taskDto.getDescription(),
                taskDto.getStartDate(),
                taskDto.getEndDate(),
                taskDto.getStatus(),
                taskDto.getProject()
        );
    }

    //From ChapGPT
    public static TaskDto mapToTaskDtoProjection(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setTaskId(task.getTaskId());
        taskDto.setTaskName(task.getTaskName());
        taskDto.setDescription(task.getDescription());
        taskDto.setStartDate(task.getStartDate());
        taskDto.setEndDate(task.getEndDate());
        taskDto.setStatus(task.getStatus());
        // Optionally include only necessary fields from the associated Project entity
        // taskDto.setProjectName(task.getProject().getName());
        return taskDto;
    }
}

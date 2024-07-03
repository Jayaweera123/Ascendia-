package com.Ascendia.server.mapper.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.TaskGetDto;
import com.Ascendia.server.entity.ProjectManager.Task;

import java.time.LocalDate;
import java.util.ArrayList;

public class TaskMapper {
    public static TaskDto mapToTaskDto(Task task) {
        return new TaskDto(
                task.getTaskId(),
                task.getTaskName(),
                task.getDescription(),
                task.getStartDate(),
                task.getEndDate(),
                // taskDto.getTaskStatus(),
                task.getCreatedDate(),
                task.getStatus(),
                task.getPrevStatus(),
                task.isCompleted(),
                task.getProject()
                //ORDER MUST BE THERE AS SAME THE DTO CLASS
        );
    }

    public static Task mapToTask(TaskDto taskDto) {
        Task task = new Task();
        task.setTaskId(taskDto.getTaskId());
        task.setTaskName(taskDto.getTaskName());
        task.setDescription(taskDto.getDescription());
        task.setStartDate(taskDto.getStartDate());
        task.setEndDate(taskDto.getEndDate());
        task.setCreatedDate(taskDto.getCreatedDate());
        task.setStatus(taskDto.getStatus());
        task.setPrevStatus(taskDto.getPrevStatus());
        task.setCompleted(taskDto.isCompleted());
        task.setProject(taskDto.getProject()); // Ensure Task entity's Project is set
        return task;
    }

    public static TaskGetDto mapToTaskGetDto(Task task) {
        return new TaskGetDto(
                task.getTaskId(),
                task.getTaskName(),
                task.getDescription(),
                task.getStartDate(),
                task.getEndDate(),
                task.getCreatedDate(),
                task.getStatus(),
                task.getPrevStatus(),
                task.isCompleted(),
                task.getProject().getProjectId(),
                task.getProject().getProjectName()
                //ORDER MUST BE THERE AS SAME THE DTO CLASS
        );
    }

    /*public static TaskDto mapToTaskDtoProjection(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setTaskId(task.getTaskId());
        taskDto.setTaskName(task.getTaskName());
        taskDto.setDescription(task.getDescription());
        taskDto.setStartDate(task.getStartDate());
        taskDto.setEndDate(task.getEndDate());
        //taskDto.setTaskStatus(task.getTaskStatus());
        taskDto.setStatus(task.getStatus());
        // Optionally include only necessary fields from the associated Project entity
        // taskDto.setProjectName(task.getProject().getName());
        return taskDto;
    }*/


}

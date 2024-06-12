package com.Ascendia.server.mapper.SiteManager;


import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.entity.SiteManager.Job;

public class JobMapper {
    public static JobDto mapToJobDto(Job job) {
        return new JobDto(
                job.getJobId(),
                job.getJobName(),
                job.getDescription(),
                job.getStartDate(),
                job.getEndDate(),
                job.getStatus(),
                job.isDone(),
                job.getTask()
        );
    }

    public static Job mapToJob(JobDto jobDto) {
        return new Job (
                jobDto.getJobId(),
                jobDto.getJobName(),
                jobDto.getDescription(),
                jobDto.getStartDate(),
                jobDto.getEndDate(),
                jobDto.getStatus(),
                jobDto.isDone(),
                jobDto.getTask()
        );
    }


   /* public static TaskDto mapToTaskDtoProjection(Task task) {
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
    }*/
}
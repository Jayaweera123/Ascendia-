package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.ProjectManager.TaskService;
import com.Ascendia.server.service.SiteManager.JobService;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class  TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    /*@Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }*/

    @Autowired
    private ProjectRepository projectRepository; // Assuming you have a repository for projects

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        // Assuming taskDto contains projectId
        // Retrieve project details from the database based on projectId
        Optional<Project> projectOptional = projectRepository.findById(taskDto.getProject().getProjectId());

        // Check if the project exists
        if (projectOptional.isPresent()) {
            // Set the project details in the taskDto
            taskDto.setProject(projectOptional.get());

            Task task = TaskMapper.mapToTask(taskDto);
            // Calculate the status
            Task.TaskStatus status = task.calculateStatus();

            task.setTaskStatus(status);
            Task savedTask = taskRepository.save(task);
            return TaskMapper.mapToTaskDto(savedTask);
        } else {
            // Handle the case where the project does not exist
            // For example, throw an exception or return null
            throw new ResourceNotFoundException("Project not found with ID: " + taskDto.getProject().getProjectId());
        }
    }

    @Override
    public TaskDto getTaskId(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with the given ID : "+taskId));
        return TaskMapper.mapToTaskDto(task);

    }



    @Override
    /*public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map((task) -> TaskMapper.mapToTaskDto(task))
                .collect(Collectors.toList());
    }*/
    //From Chat gpt
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(TaskMapper::mapToTaskDtoProjection).collect(Collectors.toList());
    }



    //================================UPDATE TASK=======================================


    @Override
    public TaskDto updateTask(Long taskId, TaskDto updateTask) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );

        // Update task properties
        task.setTaskName(updateTask.getTaskName());
        task.setDescription(updateTask.getDescription());
        task.setStartDate(updateTask.getStartDate());
        task.setEndDate(updateTask.getEndDate());

        // Recalculate task status
        Task.TaskStatus newStatus = task.calculateStatus();

        // If the task status is different, update it
        if (newStatus != task.getTaskStatus()) {
            task.setTaskStatus(newStatus);
            // Optionally, update the status string if needed
            // task.setStatus(newStatus.toString());
        }

        // Save the updated task
        Task updatedTaskObj = taskRepository.save(task);

        return TaskMapper.mapToTaskDto(updatedTaskObj);
    }

    @Override
    public void deleteTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );

        taskRepository.deleteById(taskId);
        return;
    }





    /*@Override
    public void calculateStatus(TaskDto taskDto) {
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isBefore(taskDto.getStartDate())) {
            taskDto.setStatus("Upcoming");
        } else if (currentDate.isAfter(taskDto.getEndDate())) {
            taskDto.setStatus("Completed");
        } else {
            taskDto.setStatus("Ongoing");
        }
    }*/
    @Override
    public List<TaskDto> getTasksByProjectId(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectProjectId(projectId);
        return tasks.stream().map(TaskMapper::mapToTaskDto).collect(Collectors.toList());
    }


    @Override
    public int getJobCountForTask(Long taskId) {
        return jobRepository.countJobsByTask_TaskId(taskId);
    }

    @Override
    public void updateTaskStatus(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );
        // Recalculate task status
        Task.TaskStatus newStatus = task.calculateStatus();

        // If the task status is different, update it
        if (newStatus != task.getTaskStatus()) {
            task.setTaskStatus(newStatus);
            // Optionally, update the status string if needed
            // task.setStatus(newStatus.toString());
        }
        // Save the updated task
        taskRepository.save(task);
    }

    @Transactional
    @Override
    public boolean checkCompletionOrStatusUpdate(Long taskId) {
        int jobCount = getJobCountForTask(taskId);
        boolean allJobsCompleted = false;
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (jobCount != 0) {
            allJobsCompleted = jobRepository.areAllJobsCompletedForTask(taskId);
            if (allJobsCompleted) {
                task.setTaskStatus(Task.TaskStatus.COMPLETED);
                task.setStatus("Completed");
                taskRepository.save(task);
            }   else {
                updateTaskStatus(taskId);
            }
        }
        else {
            updateTaskStatus(taskId);
        }

        return allJobsCompleted;
    }




}

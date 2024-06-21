package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.dto.Store.MaterialDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.entity.Store.Material;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.mapper.Store.MaterialMapper;
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
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class  TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;


    @Autowired
    private ProjectRepository projectRepository;

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
            //Task.TaskStatus status = task.calculateStatus();

            task.setCompleted(false);
            task.setStatus(calculateStatus(task));
            task.setCreatedDate(LocalDate.now());


            //task.setTaskStatus(status);

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


    // Helper method to retrieve a task by ID or throw exception if not found
    private Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(TaskMapper::mapToTaskDtoProjection).collect(Collectors.toList());
    }

    @Override
    public String calculateStatus(Task task) {
        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = task.getStartDate();
        LocalDate endDate = task.getEndDate();

        if (!task.isCompleted()) {
           if (startDate == null && currentDate.isAfter(endDate)) {
               return ("Overdue");
           } else if (startDate == null || currentDate.isBefore(startDate)) {
                return ("Scheduled");
           } else if (currentDate.isAfter(endDate)) {
                return ("Overdue");
           } else if ((currentDate.isEqual(startDate)) || currentDate.isEqual(endDate)) {
                return ("In-Progress");
           } else {
                return ("In-Progress");
           }
        }
        else {
            return ("Completed");
        }
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updateTask) {
        Task task = getTaskById(taskId);

        // Update task properties
        task.setTaskName(updateTask.getTaskName());
        task.setDescription(updateTask.getDescription());
        task.setStartDate(updateTask.getStartDate());
        task.setEndDate(updateTask.getEndDate());

        // Recalculate task status
        String updatedStatus = calculateStatus(task);
        if (!Objects.equals(updatedStatus, task.getStatus())) {
            task.setPrevStatus(task.getStatus());
            task.setStatus(updatedStatus);
        }

        Task updatedTaskObj = taskRepository.save(task);

        return TaskMapper.mapToTaskDto(updatedTaskObj);
    }

    @Override
    public void deleteTaskById(Long taskId) {
        /*Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );*/

        taskRepository.deleteById(taskId);
    }

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
    public int getCompletedJobCountForTask(Long taskId) {
        return jobRepository.countJobsByTask_TaskIdAndStatusCompleted(taskId);
    }



    @Override
    public void updateTaskStatus(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );
    }


    @Override
    public String CheckCompletionUpdateStatus(Long taskId) {

        Task task = getTaskById(taskId);

        String updatedStatus = calculateStatus(task);
        if (!Objects.equals(updatedStatus, task.getStatus())) {
            task.setPrevStatus(task.getStatus());
            task.setStatus(updatedStatus);
        }

        taskRepository.save(task);

        return task.getStatus();
    }

    @Override
    public boolean isCompleted(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : " + taskId)
        );
        return task.isCompleted();
    }

    //Robust method to mark as completed
    @Override
    public void markAsCompleted(Long taskId) {
        Task task = getTaskById(taskId);
        if (!task.isCompleted()) {
            task.setPrevStatus(task.getStatus());
            task.setStatus("Completed");
            task.setCompleted(true);
            taskRepository.save(task);
        }
    }

    @Override
    public void markAsUncompleted(Long taskId) {
        Task task = getTaskById(taskId);
        if (task.isCompleted()) {
            task.setPrevStatus(task.getStatus());
            task.setStatus("In-Progress");
            task.setCompleted(false);
            taskRepository.save(task);
        }

    }

    @Override
    public void moveToInProgress(Long taskId) {
        Task task = getTaskById(taskId);
        String status = task.getStatus();

        if (status != null && status.equals("Scheduled")) {
            task.setPrevStatus(status);
            task.setStatus("In-Progress");
            task.setStartDate(LocalDate.now());
            //calculateAndSetStatus(task);
            taskRepository.save(task);
        }
        else {
            return;
        }
    }

    @Override
    public List<TaskDto> searchTask(Long projectId, String query) {
        List<Task> tasks =  taskRepository.searchTask(projectId, query);
        return tasks.stream().map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }



    @Override
    public String calculateTimeDifference(TaskDto taskDto) {
        if (!taskDto.isCompleted()) {
            LocalDate currentDate = LocalDate.now();
            LocalDate endDate = taskDto.getEndDate();

            Period period;

            if (currentDate.isBefore(endDate)) {
                period = Period.between(currentDate, endDate);
            } else {
                period = Period.between(endDate, currentDate);
            }

            int years = period.getYears();
            int months = period.getMonths();
            int days = period.getDays();

            StringBuilder result = new StringBuilder();

            if (years > 0) {
                result.append(years).append(" year");
                if (years > 1) {
                    result.append("s");
                }
            }

            if (months > 0) {
                if (!result.isEmpty()) {
                    result.append(", ");
                }
                result.append(months).append(" month");
                if (months > 1) {
                    result.append("s");
                }
            }

            if (days > 0) {
                if (!result.isEmpty()) {
                    result.append(", ");
                }
                result.append(days).append(" day");
                if (days > 1) {
                    result.append("s");
                }
            }

            // Handle case when the period is zero (e.g., same day)
            if (result.isEmpty()) {
                result.append("0 days");
            }

            return result.toString();
        }
        else {
            return ("Completed");
        }
    }

    //Ravindu
    @Override
    public int getTaskProgress(Long taskId) {
        Task task = getTaskById(taskId);
        if (task.isCompleted()) {
            return 100; // Completed task
        } else {
            // Optionally implement more detailed progress calculation logic
            return 0; // Incomplete task
        }
    }

    @Override
    public double calculateProjectProgress(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectProjectId(projectId);
        if (tasks.isEmpty()) {
            return 0.0; // No tasks means no progress
        }

        double totalProgress = 0.0;
        for (Task task : tasks) {
            totalProgress += getTaskProgress(task.getTaskId());
        }

        return totalProgress / tasks.size();
    }

}

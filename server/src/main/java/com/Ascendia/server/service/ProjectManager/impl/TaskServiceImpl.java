package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class  TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
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

    @Override
    public TaskDto updateTask(Long taskId, TaskDto updateTask) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task is not in exists with given id : "+ taskId)
        );

        task.setTaskName(updateTask.getTaskName());
        task.setDescription(updateTask.getDescription());
        task.setStartDate(updateTask.getStartDate());
        task.setEndDate(updateTask.getEndDate());

        Task updatedTaskObj = taskRepository.save(task);

        return TaskMapper.mapToTaskDto(updatedTaskObj);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new ResourceNotFoundException("Task not found with id : "+ taskId)
        );
        taskRepository.deleteById(taskId);

    }
    @Override
    public void calculateStatus(TaskDto taskDto) {
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isBefore(taskDto.getStartDate())) {
            taskDto.setStatus("Upcoming");
        } else if (currentDate.isAfter(taskDto.getEndDate())) {
            taskDto.setStatus("Completed");
        } else {
            taskDto.setStatus("Ongoing");
        }
    }
    @Override
    public List<TaskDto> getTasksByProjectId(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectProjectId(projectId);
        return tasks.stream().map(TaskMapper::mapToTaskDto).collect(Collectors.toList());
    }


}

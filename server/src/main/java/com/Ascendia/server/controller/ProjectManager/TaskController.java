package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/task")

public class TaskController {

    @Autowired
    private TaskService taskService;

    //Add Task REST API
    @PostMapping("/add")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    //Get Task REST API
    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.getTaskId(taskId);
        return ResponseEntity.ok(taskDto);
    }

    //Get all Tasks REST API
    @GetMapping("all")
    public ResponseEntity<List<TaskDto>>  getAllTasks() {
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
/*
    //Update Tasks REST API
    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,
                                              @RequestBody TaskDto updatedTask) {

        TaskDto taskDto = taskService.updateTask(taskId, updatedTask);
        Task.calculateStatus(taskDto);
        return ResponseEntity.ok(taskDto);
    }*/

    @PutMapping("/{taskId}/edit")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long taskId, @RequestBody TaskDto taskDto) {
        // Update the task
        TaskDto updatedTaskDto = taskService.updateTask(taskId, taskDto);

        if (updatedTaskDto != null) {
            // Return the updated task DTO with HTTP status OK
            return ResponseEntity.ok(updatedTaskDto);
        } else {
            // Task not found, return 404 Not Found status
            return ResponseEntity.notFound().build();
        }
    }


    //Delete Tasks REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTaskById(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    //get task for the projectID
    @GetMapping("/api/project/{projectId}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{taskId}/jobcount")
    public ResponseEntity<Integer> getJobCountForTask(@PathVariable Long taskId) {
        int jobCount = taskService.getJobCountForTask(taskId);
        return ResponseEntity.ok(jobCount);
    }

    @GetMapping("/{taskId}/set-status")
    public boolean setTaskStatusLable(@PathVariable Long taskId) {
        return taskService.checkCompletionOrStatusUpdate(taskId);
    }

    /*@GetMapping("/{taskId}/jobcount")
    public ResponseEntity<Object> getJobCountForTask(@PathVariable Long taskId) {
        int jobCount = taskService.getJobCountForTask(taskId);
        return ResponseEntity.ok().body(jobCount + "");
    }*/


    //Manual json format
   /* @GetMapping("/{taskId}/jobCount")
    public ResponseEntity<Object> getJobCountForTask(@PathVariable Long taskId) {
        int jobCount = taskService.getJobCountForTask(taskId);
        return ResponseEntity.ok().body("{\"jobCount\": " + jobCount + "}");
    }*/
}


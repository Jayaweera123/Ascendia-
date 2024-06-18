package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping

public class TaskController {

    private TaskService taskService;

    //Add Task REST API
    @PostMapping("/pmanageronly/task")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    //Get Task REST API
    @GetMapping("/pmanager/task/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.getTaskId(taskId);
        return ResponseEntity.ok(taskDto);
    }

    //Get all Tasks REST API
    @GetMapping("/pmanager/task/all")
    public ResponseEntity<List<TaskDto>>  getAllTasks() {
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    //Update Tasks REST API
    @PutMapping("/pmanageronly/task/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId,
                                              @RequestBody TaskDto updatedTask) {

        TaskDto taskDto = taskService.updateTask(taskId, updatedTask);
        taskService.calculateStatus(taskDto);
        return ResponseEntity.ok(taskDto);
    }

    //Delete Tasks REST API
    @DeleteMapping("/pmanageronly/task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    //CHat GPT get task for the projectID
    @GetMapping("/pmanager/project/{projectId}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }



}


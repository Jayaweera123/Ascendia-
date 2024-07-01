package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Project.TaskProgressDto;
import com.Ascendia.server.dto.ProjectManager.TaskUpdateDto;
import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class TaskController {

    @Autowired
    private TaskService taskService;

    //Add Task REST API
    @PostMapping("/sengineer/task/add")
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    //Get Task REST API
    @GetMapping("/sengineer/task/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.getTaskId(taskId);
        return ResponseEntity.ok(taskDto);
    }

    @PutMapping("/sengineer/{taskId}/edit")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long taskId, @RequestBody TaskUpdateDto taskDto) {
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
    @DeleteMapping("/pmanageronly/task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTaskById(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    //get task for the projectID
    @GetMapping("/sengineer/{projectId}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByProjectId(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    //Get the total job Count REST API
    @GetMapping("/pmanager/{taskId}/jobcount")
    public ResponseEntity<Integer> getJobCountForTask(@PathVariable Long taskId) {
        int jobCount = taskService.getJobCountForTask(taskId);
        return ResponseEntity.ok(jobCount);
    }

    //Completed Job Count
    @GetMapping("/pmanager/{taskId}/job/completed")
    public ResponseEntity<Integer> getCompletedJobCountForTask(@PathVariable Long taskId) {
        int completedJobCount = taskService.getCompletedJobCountForTask(taskId);
        return ResponseEntity.ok(completedJobCount);
    }

    @PutMapping("/sengineer/{taskId}/status")
    public String setTaskStatusLable(@PathVariable Long taskId) {
        return taskService.CheckCompletionUpdateStatus(taskId);
    }

    //Task search REST API
    @GetMapping("/pmanager/search/task/{projectId}")
    public ResponseEntity<List<TaskDto>> searchTask(@PathVariable Long projectId, @RequestParam("query") String query){
        return ResponseEntity.ok(taskService.searchTask(projectId, query));
    }

    //Get the time between the deadline
    @GetMapping("/pmanager/{taskId}/due-days")
    public String getTimeDifference(@PathVariable("taskId") Long taskId) {
        TaskDto taskDto = taskService.getTaskId(taskId);
        return taskService.calculateTimeDifference(taskDto);
    }

    @PutMapping("/sengineer/{taskId}/mark-as-ongoing")
    public void markAsInProgress(@PathVariable Long taskId) {
        taskService.moveToInProgress(taskId);
    }

    @PutMapping("/sengineer/{taskId}/mark-as-done")
    public String markAsDone(@PathVariable Long taskId) {
        taskService.markAsCompleted(taskId);
        return ("task id "+taskId+" marked as Completed");
    }

    @PutMapping("/pmanageronly/{taskId}/mark-as-undone")
    public void markAsUndone(@PathVariable Long taskId) {
        taskService.markAsUncompleted(taskId);
    }

    //Ravindu
    @GetMapping("/progress/{taskId}/taskprogress")
    public ResponseEntity<Integer> getTaskProgress(@PathVariable Long taskId) {
        int progress = taskService.getTaskProgress(taskId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/progress/{projectId}/projectprogress")
    public ResponseEntity<Double> calculateProjectProgress(@PathVariable Long projectId) {
        double progress = taskService.calculateProjectProgress(projectId);
        return ResponseEntity.ok(progress);
    }
}


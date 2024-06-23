package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
<<<<<<< HEAD
=======
import com.Ascendia.server.dto.Project.TaskProgressDto;
import com.Ascendia.server.dto.Store.EquipmentDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
>>>>>>> origin/Rashmi_Merge-2.2
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

<<<<<<< HEAD
    //Get all Tasks REST API
    @GetMapping("all")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
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
=======
    @PutMapping("/sengineer/{taskId}/edit")
>>>>>>> origin/Rashmi_Merge-2.2
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
/*
    @GetMapping("/{taskId}/jobcount/completed")
    public ResponseEntity<Integer> getCompletedJobCountForTask(@PathVariable Long taskId) {
        int completedJobCount = taskService.getCompletedJobCountForTask(taskId);
        return ResponseEntity.ok(completedJobCount);
    }
*/

<<<<<<< HEAD
    @PutMapping("/{taskId}/set-status")
    public String setTaskStatusLable(@PathVariable Long taskId) {
        return taskService.CheckCompletionUpdateStatus(taskId);
    }

    //Build search REST API
    @GetMapping("/search/{projectId}")
    public ResponseEntity<List<TaskDto>> searchTask(@PathVariable Long projectId, @RequestParam("query") String query) {
=======
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
>>>>>>> origin/Rashmi_Merge-2.2
        return ResponseEntity.ok(taskService.searchTask(projectId, query));
    }

    //Get the time between the deadline
    @GetMapping("/pmanager/{taskId}/due-days")
    public String getTimeDifference(@PathVariable("taskId") Long taskId) {
        TaskDto taskDto = taskService.getTaskId(taskId);
        return taskService.calculateTimeDifference(taskDto);
    }

<<<<<<< HEAD
    @PutMapping("/{taskId}/mark-as-ongoing")
=======
    @PutMapping("/sengineer/{taskId}/mark-as-ongoing")
>>>>>>> origin/Rashmi_Merge-2.2
    public void markAsInProgress(@PathVariable Long taskId) {
        taskService.moveToInProgress(taskId);
    }

    @PutMapping("/sengineer/{taskId}/mark-as-done")
    public void markAsDone(@PathVariable Long taskId) {
        taskService.markAsCompleted(taskId);
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
    public ResponseEntity<Double> getProjectProgress(@PathVariable Long projectId) {
        double progress = taskService.calculateProjectProgress(projectId);
        return ResponseEntity.ok(progress);
    }

    //========== new Rest API ========

<<<<<<< HEAD
    @GetMapping("/api/task/{projectId}/scheduled")
    public ResponseEntity<List<TaskDto>> getTasksByScheduledStatus(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByScheduledStatus(projectId);
        return ResponseEntity.ok(tasks);
=======
    //Ravindu
    @GetMapping("/progress/{projectId}/taskprogress")
    public ResponseEntity<List<TaskProgressDto>> getTasksProgressByProjectId(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByProjectId(projectId);
        List<TaskProgressDto> taskProgressList = tasks.stream()
                .map(task -> new TaskProgressDto(task.getTaskId(), task.getTaskName(), taskService.getTaskProgress(task.getTaskId())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(taskProgressList);
>>>>>>> origin/Rashmi_Merge-2.2
    }

    @GetMapping("/api/task/{projectId}/inProgress")
    public ResponseEntity<List<TaskDto>> getTasksByInProgresStatus(@PathVariable Long projectId) {
        List<TaskDto> tasks = taskService.getTasksByInProgresStatus(projectId);
        return ResponseEntity.ok(tasks);

    }
}
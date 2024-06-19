package com.Ascendia.server.controller.SiteManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.service.SiteManager.JobService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class JobController {

    private JobService jobService;
    @GetMapping("/senginner/job/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Long jobId) {
        JobDto jobDto = jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }

    @GetMapping("/senginner/task/{taskId}/jobs")
    public ResponseEntity<List<JobDto>> getJobsByTaskId(@PathVariable Long taskId) {
        List<JobDto> jobs = jobService.getJobsByTaskId(taskId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/senginner/search/{taskId}")
    public ResponseEntity<List<JobDto>> searchJob(@PathVariable Long taskId, @RequestParam("query") String query){
        return ResponseEntity.ok(jobService.searchJob(taskId, query));
    }

    @PutMapping("/senginner/complete/{jobId}")
    public ResponseEntity<Void> completeJobById(@PathVariable Long jobId) {
        jobService.markJobAsCompletedById(jobId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/senginner/updateStatus/{jobId}")
    public ResponseEntity<String> updateJobStatus(@PathVariable Long jobId) {
        String newStatus = jobService.updateJobStatus(jobId);
        return ResponseEntity.ok(newStatus);
    }









}

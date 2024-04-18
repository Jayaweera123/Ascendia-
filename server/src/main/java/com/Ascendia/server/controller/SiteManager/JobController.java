package com.Ascendia.server.controller.SiteManager;

import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.service.SiteManager.JobService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/job")
public class JobController {

    private JobService jobService;
    @GetMapping("{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Long jobId) {
        JobDto jobDto = jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }

    @GetMapping("/api/task/{taskId}/jobs")
    public ResponseEntity<List<JobDto>> getJobsByTaskId(@PathVariable Long taskId) {
        List<JobDto> jobs = jobService.getJobsByTaskId(taskId);
        return ResponseEntity.ok(jobs);
    }

}

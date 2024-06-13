package com.Ascendia.server.controller.SiteManager;

import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.service.SiteManager.JobService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/job")
public class JobController {

    private JobService jobService;

    @GetMapping("/api/task/{taskId}/jobs")
    public ResponseEntity<List<JobDto>> getJobsByTaskId(@PathVariable Long taskId) {
        List<JobDto> jobs = jobService.getJobsByTaskId(taskId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/search/{taskId}")
    public ResponseEntity<List<JobDto>> searchJob(@PathVariable Long taskId, @RequestParam("query") String query){
        return ResponseEntity.ok(jobService.searchJob(taskId, query));
    }

    @PutMapping("/complete/{jobId}")
    public ResponseEntity<Void> completeJobById(@PathVariable Long jobId) {
        jobService.markJobAsCompletedById(jobId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateStatus/{jobId}")
    public ResponseEntity<String> updateJobStatus(@PathVariable Long jobId) {
        String newStatus = jobService.updateJobStatus(jobId);
        return ResponseEntity.ok(newStatus);
    }









    // add the sample API
    @PostMapping("createJob")
    public ResponseEntity<JobDto> createJob (@RequestBody JobDto jobDto){
        JobDto savedJob = jobService.createJob(jobDto);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }


    // get comment API
    @GetMapping("{jobId}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("jobId") Long jobId){
        JobDto jobDto =  jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }


    //get all the comment list API
    @GetMapping("allJobs")
    public ResponseEntity <List<JobDto>> getAllJob(){
        List<JobDto> jobs = jobService.getAllJob();
        return ResponseEntity.ok(jobs);
    }


    //update the sample API
    @PutMapping("{jobId}")
    public ResponseEntity<JobDto>updateJob(@PathVariable("jobId") Long jobId ,@RequestBody JobDto updateJob){
        JobDto jobDto =jobService.updateJob(jobId , updateJob);
        return ResponseEntity.ok(jobDto);
    }

    //delete comment API
    @DeleteMapping("{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable("jobId") Long jobId ){
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("job is delete successfully");
    }







}
//package com.Ascendia.server.controller.SiteEngineer;
//
//import com.Ascendia.server.dto.SiteEngineer.JobDto;
//import com.Ascendia.server.service.SiteEngineer.JobService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v2/job")
//@AllArgsConstructor
//public class JobController {
//
//
//    private JobService jobService;
//    // add the sample API
//    @PostMapping("createJob")
//    public ResponseEntity<JobDto> createJob (@RequestBody JobDto jobDto){
//        JobDto savedJob = jobService.createJob(jobDto);
//        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
//    }
//
//
//    // get comment API
//    @GetMapping("{jobId}")
//    public ResponseEntity<JobDto> getJobById(@PathVariable("jobId") int jobId){
//        JobDto jobDto =  jobService.getJobById(jobId);
//        return ResponseEntity.ok(jobDto);
//    }
//
//
//    //get all the comment list API
//    @GetMapping
//    public ResponseEntity <List<JobDto>> getAllJob(){
//        List<JobDto> jobs = jobService.getAllJob();
//        return ResponseEntity.ok(jobs);
//    }
//
//
//    //update the sample API
//    @PutMapping("{jobId}")
//    public ResponseEntity<JobDto>updateJob(@PathVariable("jobId") int jobId ,@RequestBody JobDto updateJob){
//        JobDto jobDto =jobService.updateJob(jobId , updateJob);
//        return ResponseEntity.ok(jobDto);
//    }
//
//    //delete comment API
//    @DeleteMapping("{jobId}")
//    public ResponseEntity<String> deleteJob(@PathVariable("jobId") int jobId ){
//        jobService.deleteJob(jobId);
//        return ResponseEntity.ok("job is delete successfully");
//    }

//
//}

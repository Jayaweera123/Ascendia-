package com.Ascendia.server.service.SiteManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.SiteManager.JobDto;

import java.util.List;

public interface JobService {
    //JobDto createJob(JobDto jobDto);


    //List<JobDto> getAllJobs();

    //JobDto updateJob(Long jobId, JobDto updateJob);

    //void deleteJob(Long jobId);

    //void calculateStatus(JobDto jobDto);

    List<JobDto> getJobsByTaskId(Long taskId);

    boolean areAllJobsCompletedForTask(Long taskId);

    List<JobDto> searchJob(Long TaskId, String query);

    void markJobAsCompletedById(Long jobId);

    String updateJobStatus(Long jobId);




    JobDto createJob (JobDto jobDto);

    JobDto getJobById(Long jobId);

    List<JobDto> getAllJob();

    JobDto updateJob (Long jobId, JobDto jobDto);

    void deleteJob (Long jobId);



}

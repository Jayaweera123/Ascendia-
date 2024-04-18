package com.Ascendia.server.service.SiteManager;


import com.Ascendia.server.dto.SiteManager.JobDto;

import java.util.List;

public interface JobService {
    //JobDto createJob(JobDto jobDto);

    JobDto getJobById(Long jobId);

    //List<JobDto> getAllJobs();

    //JobDto updateJob(Long jobId, JobDto updateJob);

    //void deleteJob(Long jobId);

    //void calculateStatus(JobDto jobDto);

    List<JobDto> getJobsByTaskId(Long taskId);
}

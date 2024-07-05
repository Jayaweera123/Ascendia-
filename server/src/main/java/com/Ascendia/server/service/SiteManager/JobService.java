package com.Ascendia.server.service.SiteManager;


import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.dto.SiteManager.JobGetDto;
import com.Ascendia.server.entity.ProjectManager.Task;

import java.util.List;

public interface JobService {
    //JobDto createJob(JobDto jobDto);

    JobGetDto getJobById(Long jobId);



    //List<JobDto> getAllJobs();

    //JobDto updateJob(Long jobId, JobDto updateJob);

    //void deleteJob(Long jobId);

    //void calculateStatus(JobDto jobDto);

    List<JobGetDto> getJobsByTaskId(Long taskId);

    boolean areAllJobsCompletedForTask(Long taskId);

    List<JobGetDto> searchJob(Long TaskId, String query);

    void markJobAsCompletedById(Long jobId);

    String updateJobStatus(Long jobId);

   // String calculateStatus(Task task);


}

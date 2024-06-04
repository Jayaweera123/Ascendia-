package com.Ascendia.server.service.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.JobDto;

import java.util.List;

public interface JobService {

    JobDto createJob (JobDto jobDto);

    JobDto getJobById(int jobId);

    List<JobDto> getAllJob();

    JobDto updateJob (int jobId, JobDto jobDto);

    void deleteJob (int jobId);

}

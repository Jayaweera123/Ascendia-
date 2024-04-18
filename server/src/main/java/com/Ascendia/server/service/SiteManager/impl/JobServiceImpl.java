package com.Ascendia.server.service.SiteManager.impl;


import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.SiteManager.JobService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
    private JobRepository jobRepository;

    @Override
    public JobDto getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Job not found with the given ID : "+jobId));
        return JobMapper.mapToJobDto(job);

        }

    @Override
    public List<JobDto> getJobsByTaskId(Long taskId) {
        List<Job> jobs = jobRepository.findByTaskTaskId(taskId);
        return jobs.stream().map(JobMapper::mapToJobDto).collect(Collectors.toList());
    }

}




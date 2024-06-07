package com.Ascendia.server.service.SiteEngineer.impl1;

import com.Ascendia.server.dto.SiteEngineer.JobDto;
import com.Ascendia.server.entity.SiteEngineer.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteEngineer.JobMapper;
import com.Ascendia.server.repository.SiteEngineer.JobRepository;
import com.Ascendia.server.service.SiteEngineer.JobService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceimpl1 implements JobService {
    private JobRepository jobRepository;

    @Override
    public JobDto createJob(JobDto jobDto) {
        Job job = JobMapper.mapToJob(jobDto);
        Job savedJob = jobRepository.save(job);
        return JobMapper.mapToJobDto(savedJob);
    }

    @Override
    public JobDto getJobById(int jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException( "Job is not exist with given id "));
        return JobMapper.mapToJobDto(job);
    }

    @Override
    public List<JobDto> getAllJob() {
        List<Job> jobs= jobRepository.findAll();
        return jobs.stream().map(job -> JobMapper.mapToJobDto(job))
                .collect(Collectors.toList());
    }

    @Override
    public JobDto updateJob(int jobId, JobDto updatedJob) {

        Job job=jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("job is  not exist with given is : "+ jobId)
        );
        job.setJobName(updatedJob.getJobName());
        job.setDescription(updatedJob.getDescription());
        job.setEndDate(updatedJob.getEndDate());
        job.setStartDate(updatedJob.getStartDate());
        job.setStatus(updatedJob.getStatus());

        Job updateJobObj = jobRepository.save(job);

        return JobMapper.mapToJobDto(updateJobObj);

    }

    @Override
    public void deleteJob(int jobId) {

        Job job= jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("job is  not exist with given is : "+ jobId)
        );
        jobRepository.deleteById(jobId);

    }
    }

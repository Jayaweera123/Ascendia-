package com.Ascendia.server.service.SiteManager.impl;


import com.Ascendia.server.dto.SiteManager.JobDto;
import com.Ascendia.server.dto.SiteManager.JobGetDto;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.SiteManager.JobService;
import jakarta.transaction.Transactional; //can import this from spring framework also
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {

    private JobRepository jobRepository;
    private TaskRepository taskRepository;

    @Override
    public JobDto createJob(JobDto jobDto){

        Optional<Task> taskOptional = taskRepository.findById(jobDto.getTask().getTaskId());
        if (taskOptional.isPresent()) {
            // Set the tasks details in the jobDto
            jobDto.setTask(taskOptional.get());
            Job job = JobMapper.mapToJob(jobDto);
            // Calculate the status
            job.setStatus("TO_DO"); // Set default status
            job.setDone(false);


            Job savedJob = jobRepository.save(job);
            return JobMapper.mapToJobDto(savedJob);
        } else {
            // Handle the case where the project does not exist
            // For example, throw an exception or return null
            throw new ResourceNotFoundException("Tasks not found with ID: " + jobDto.getTask().getTaskId());
        }
    }

    @Override
    public JobGetDto getJobById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Job not found with the given ID : "+jobId));
        return JobMapper.mapToJobGetDto(job);

        }

    @Override
    public List<JobGetDto> getJobsByTaskId(Long taskId) {
        List<Job> jobs = jobRepository.findByTaskTaskId(taskId);
        return jobs.stream().map(JobMapper::mapToJobGetDto).collect(Collectors.toList());
    }

    @Override
    public boolean areAllJobsCompletedForTask(Long taskId) {
        return jobRepository.areAllJobsCompletedForTask(taskId);

    }

    @Override
    public List<JobGetDto> searchJob(Long taskId, String query) {
        List<Job> jobs =  jobRepository.searchJob(taskId, query);
        return jobs.stream().map(JobMapper::mapToJobGetDto)
                .collect(Collectors.toList());
    }


   @Override
    public void markJobAsCompletedById(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job is not in exists with given id : " + jobId)
        );

        // Update job properties
        job.setDone(true);
        job.setStatus("Completed");

        // Save the updated task
        Job updatedJob = jobRepository.save(job);
    }

    @Override
    public String updateJobStatus(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job does not exist with given id: " + jobId)
        );

        // Calculate and update the job status
        String newStatus = calculateStatus(job);

        // If the job status is different, update it
        if (!newStatus.equals(job.getStatus())) {
            job.setStatus(newStatus);
            jobRepository.save(job);
        }

        return newStatus;
    }


    public String calculateStatus(Job job) {
        LocalDate currentDate = LocalDate.now();
        LocalDate startDate = job.getStartDate();
        LocalDate endDate = job.getEndDate();

        if (!job.isDone()) {
            if (startDate == null && currentDate.isAfter(endDate)) {
                return ("Overdue");
            } else if (startDate == null || currentDate.isBefore(startDate)) {
                return ("Scheduled");
            } else if (currentDate.isAfter(endDate)) {
                return ("Overdue");
            } else if ((currentDate.isEqual(startDate)) || currentDate.isEqual(endDate)) {
                return ("In-Progress");
            } else {
                return ("In-Progress");
            }
        }
        else {
            return ("Completed");
        }
    }




}




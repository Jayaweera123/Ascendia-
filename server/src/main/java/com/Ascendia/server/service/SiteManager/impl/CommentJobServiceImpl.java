package com.Ascendia.server.service.SiteManager.impl;

import com.Ascendia.server.dto.SiteManager.CommentJobDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseJobDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.SiteManager.CommentJob;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteManager.CommentJobMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.SiteManager.CommentJobRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.SiteManager.CommentJobService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentJobServiceImpl implements CommentJobService {


    private CommentJobRepository commentJobRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public CommentResponseJobDto createJobComment(CommentJobDto commentJobDto) {
        // Validate the incoming DTO
        if (commentJobDto == null) {
            throw new IllegalArgumentException("CommentJobDto cannot be null");
        }

        if (commentJobDto.getJob() == null || commentJobDto.getJob().getJobId() == null) {
            throw new IllegalArgumentException("Job information in CommentJobDto cannot be null");
        }

        if (commentJobDto.getCommentedJobUser() == null || commentJobDto.getCommentedJobUser().getUserID() == null) {
            throw new IllegalArgumentException("Commented user information in CommentDto cannot be null");
        }

        // Retrieve Task details from the database based on taskId
        Job job = jobRepository.findById(commentJobDto.getJob().getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + commentJobDto.getJob().getJobId()));

        // Retrieve user details from the database based on userId (for Commenter)
        User commentedUser = userRepository.findById(commentJobDto.getCommentedJobUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + commentJobDto.getCommentedJobUser().getUserID()));

        // Map DTO to entity
        CommentJob commentJob = CommentJobMapper.mapToCommentJob(commentJobDto);

        // Set additional fields
        commentJob.setCommentJobDate(LocalDateTime.now());
        commentJob.setJob(job);
        commentJob.setCommentedJobUser(commentedUser);

        // Save comment
        CommentJob savedJobComment = commentJobRepository.save(commentJob);

        // Return response DTO
        return CommentJobMapper.mapToCommentResponseJobDto(savedJobComment);
    }


    @Override
    public CommentJobDto updateJobComment(Long commentJobId, CommentJobDto updatedJobComment) {
        CommentJob commentJob = commentJobRepository.findById(commentJobId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is not exist in here.")
        );

        commentJob.setJob(updatedJobComment.getJob());
        commentJob.setCommentedJobUser(updatedJobComment.getCommentedJobUser());
        // comment.setTaskName(updatedComment.getTaskName());
        commentJob.setCommentJobText(updatedJobComment.getCommentJobText());
        commentJob.setCommentJobDate(LocalDateTime.now());

        CommentJob updateJobCommentObj = commentJobRepository.save(commentJob);


        return CommentJobMapper.mapToCommentJobDto(updateJobCommentObj);

    }

    @Override
    public List<CommentJobDto> getAllJobComment() {
        List<CommentJob> commentJobs= commentJobRepository.findAll();

        return commentJobs.stream().map(commentJob -> CommentJobMapper.mapToCommentJobDto(commentJob))
                .collect(Collectors.toList());
    }


    @Override
    public void deleteJobComment(Long commentJobId) {
        CommentJob commentJob = commentJobRepository.findById(commentJobId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is  not exist with given is : " + commentJobId)
        );
        commentJobRepository.deleteById(commentJobId);


    }

    @Override
    public List<CommentResponseJobDto> getJobCommentsByJobId(Long jobId) {
        // Retrieve Task details from the database based on projectId
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + jobId));

        List<CommentJob> commentJobs = commentJobRepository.findByJobJobId(jobId);
        return commentJobs.stream().map(CommentJobMapper::mapToCommentResponseJobDto).collect(Collectors.toList());
    }



}
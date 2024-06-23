package com.Ascendia.server.service.SiteManager.impl;

import com.Ascendia.server.dto.SiteManager.CommentDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.SiteManager.Comment;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteManager.CommentMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.SiteManager.CommentRepository;
import com.Ascendia.server.service.SiteManager.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentServiceimpl implements CommentService{


    private CommentRepository commentRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public CommentResponseDto createComment(CommentDto commentDto) {
        // Validate the incoming DTO
        if (commentDto == null) {
            throw new IllegalArgumentException("CommentDto cannot be null");
        }

        if (commentDto.getTask() == null || commentDto.getTask().getTaskId() == null) {
            throw new IllegalArgumentException("Task information in CommentDto cannot be null");
        }

        if (commentDto.getCommentedUser() == null || commentDto.getCommentedUser().getUserID() == null) {
            throw new IllegalArgumentException("Commented user information in CommentDto cannot be null");
        }

        // Retrieve Task details from the database based on taskId
        Task task = taskRepository.findById(commentDto.getTask().getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + commentDto.getTask().getTaskId()));

        // Retrieve user details from the database based on userId (for Commenter)
        User commentedUser = userRepository.findById(commentDto.getCommentedUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + commentDto.getCommentedUser().getUserID()));

        // Map DTO to entity
        Comment comment = CommentMapper.mapToComment(commentDto);

        // Set additional fields
        comment.setCommentDate(LocalDateTime.now());
        comment.setTask(task);
        comment.setCommentedUser(commentedUser);

        // Save comment
        Comment savedComment = commentRepository.save(comment);

        // Return response DTO
        return CommentMapper.mapToCommentResponseDto(savedComment);
    }


    @Override
    public CommentDto updateComment(int commentId, CommentDto updatedComment) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is not exist in here.")
        );

        comment.setTask(updatedComment.getTask());
        comment.setCommentedUser(updatedComment.getCommentedUser());
        // comment.setTaskName(updatedComment.getTaskName());
        comment.setCommentText(updatedComment.getCommentText());
        comment.setCommentDate(LocalDateTime.now());

        Comment updateCommentObj = commentRepository.save(comment);


        return CommentMapper.mapToCommentDto(updateCommentObj);

    }

    @Override
    public List<CommentDto> getAllComment() {
        List<Comment> comments= commentRepository.findAll();

        return comments.stream().map(comment -> CommentMapper.mapToCommentDto(comment))
                .collect(Collectors.toList());
    }


    @Override
    public void deleteComment(int commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is  not exist with given is : " + commentId)
        );
        commentRepository.deleteById(commentId);


    }

    @Override
    public List<CommentResponseDto> getCommentsByTaskId(Long taskId) {
        // Retrieve Task details from the database based on projectId
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + taskId));

        List<Comment> comments = commentRepository.findByTaskTaskId(taskId);
        return comments.stream().map(CommentMapper::mapToCommentResponseDto).collect(Collectors.toList());
    }
}
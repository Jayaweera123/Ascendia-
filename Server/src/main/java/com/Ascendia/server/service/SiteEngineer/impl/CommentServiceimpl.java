package com.Ascendia.server.service.SiteEngineer.impl;

import com.Ascendia.server.dto.SiteEngineer.CommentDto;
import com.Ascendia.server.entity.SiteEngineer.Comment;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.SiteEngineer.CommetMapper;
import com.Ascendia.server.repository.SiteEngineer.CommentRepository;
import com.Ascendia.server.service.SiteEngineer.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentServiceimpl implements CommentService {

    private CommentRepository commentRepository;

    @Override
    public CommentDto createComment(CommentDto commentDto) {
        Comment comment = CommetMapper.mapToComment(commentDto);
        Comment savedComment = commentRepository.save(comment);
        return CommetMapper.mapToCommentDto(savedComment);

    }

    @Override
    public CommentDto updateComment(int commentId, CommentDto updatedComment) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is not exist in here.")
        );

        comment.setTaskId(updatedComment.getTaskId());
        comment.setUserId(updatedComment.getUserId());
        comment.setTaskName(updatedComment.getTaskName());
        comment.setCommentText(updatedComment.getCommentText());
        comment.setCommentDate(updatedComment.getCommentDate());

        Comment updateCommentObj = commentRepository.save(comment);


        return CommetMapper.mapToCommentDto(updateCommentObj);

    }

    @Override
    public List<CommentDto> getAllComment() {
        List<Comment> comments= commentRepository.findAll();

        return comments.stream().map(comment -> CommetMapper.mapToCommentDto(comment))
                .collect(Collectors.toList());
    }


    @Override
    public void deleteComment(int commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment is  not exist with given is : " + commentId)
        );
        commentRepository.deleteById(commentId);


    }
}

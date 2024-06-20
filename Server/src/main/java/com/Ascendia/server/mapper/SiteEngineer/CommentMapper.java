package com.Ascendia.server.mapper.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.CommentDto;
import com.Ascendia.server.dto.SiteEngineer.CommentResponseDto;
import com.Ascendia.server.entity.SiteEngineer.Comment;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CommentMapper {
    public static CommentDto mapToCommentDto(Comment comment){
        return new CommentDto(
                comment.getCommentId(),
                comment.getTask(),
                //comment.getTaskName(),
                comment.getCommentedUser(),
                comment.getCommentText(),
                comment.getCommentDate()
        );
    }

    public static Comment mapToComment(CommentDto commentDto){
        return new Comment(
                commentDto.getCommentId(),
                commentDto.getTask(),
                //commentDto.getTaskName(),
                commentDto.getCommentedUser(),
                commentDto.getCommentText(),
                commentDto.getCommentDate()
        );
    }

    public static CommentResponseDto mapToCommentResponseDto(Comment savedComment){
        return new CommentResponseDto(
                savedComment.getCommentId(),
                savedComment.getTask().getTaskId(),
                savedComment.getTask().getTaskName(),
                savedComment.getCommentedUser().getFirstName() + " " + savedComment.getCommentedUser().getLastName(),
                savedComment.getCommentedUser().getDesignation(),
                savedComment.getCommentedUser().getProfilePicUrl(),
                savedComment.getCommentText(),
                CommentMapper.convertDateTime(savedComment.getCommentDate())
        );
    }


    public static String convertDateTime(LocalDateTime dateTime) {
        // Define the pattern for the desired output
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d, E yyyy hh.mm a");

        // Format the given LocalDateTime with the specified pattern
        return dateTime.format(formatter);
    }


}
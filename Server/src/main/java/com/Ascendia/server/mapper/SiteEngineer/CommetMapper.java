package com.Ascendia.server.mapper.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.CommentDto;
import com.Ascendia.server.entity.SiteEngineer.Comment;

public class CommetMapper {
    public static CommentDto mapToCommentDto(Comment comment){
        return new CommentDto(
                comment.getCommentId(),
                comment.getTaskId(),
                comment.getTaskName(),
                comment.getUserId(),
                comment.getCommentText(),
                comment.getCommentDate()
        );
    }

    public static Comment mapToComment(CommentDto commentDto){
        return new Comment(
                commentDto.getCommentId(),
                commentDto.getTaskId(),
                commentDto.getTaskName(),
                commentDto.getUserId(),
                commentDto.getCommentText(),
                commentDto.getCommentDate()
        );
    }
}

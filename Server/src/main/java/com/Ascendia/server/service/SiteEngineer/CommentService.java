package com.Ascendia.server.service.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.CommentDto;

import java.util.List;

public interface CommentService {

    CommentDto createComment (CommentDto commentDto);

    CommentDto updateComment(int commentId,CommentDto commentDto);

    List<CommentDto> getAllComment();

    void deleteComment (int commentId);

}

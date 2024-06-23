package com.Ascendia.server.service.SiteManager;

import com.Ascendia.server.dto.SiteManager.CommentDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {

    CommentResponseDto createComment (CommentDto commentDto);

    CommentDto updateComment(int commentId,CommentDto commentDto);

    List<CommentDto> getAllComment();

    void deleteComment (int commentId);

    List<CommentResponseDto> getCommentsByTaskId(Long taskId);

}
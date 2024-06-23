package com.Ascendia.server.service.SiteManager;

import com.Ascendia.server.dto.SiteManager.CommentJobDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseJobDto;

import java.util.List;

public interface CommentJobService {



    CommentResponseJobDto createJobComment (CommentJobDto commentJobDto);

    CommentJobDto updateJobComment(int commentJobId,CommentJobDto commentJobDto);

    List<CommentJobDto> getAllJobComment();

    void deleteJobComment (int commentJobId);

    List<CommentResponseJobDto> getJobCommentsByJobId(Long jobId);


}

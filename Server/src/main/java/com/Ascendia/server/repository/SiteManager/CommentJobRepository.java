package com.Ascendia.server.repository.SiteManager;

import com.Ascendia.server.entity.SiteManager.CommentJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentJobRepository extends JpaRepository<CommentJob,Integer> {

    List<CommentJob>findByCommentJobIdGreaterThan(int commentJobId);

    List<CommentJob>findByJobJobId(Long jobId);


}

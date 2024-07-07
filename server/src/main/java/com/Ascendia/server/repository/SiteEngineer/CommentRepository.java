//package com.Ascendia.server.repository.SiteEngineer;
//
//import com.Ascendia.server.entity.SiteEngineer.Comment;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface CommentRepository extends JpaRepository<Comment,Integer> {
//    List<Comment> findByCommentIdGreaterThan(int commentId);
//
//    List<Comment> findByTaskTaskId(Long taskId);
//}
//
//package com.Ascendia.server.controller.SiteEngineer;
//
//import com.Ascendia.server.dto.SiteEngineer.CommentDto;
//import com.Ascendia.server.dto.SiteEngineer.CommentResponseDto;
//import com.Ascendia.server.service.SiteEngineer.CommentService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("api/v2/comment")
//@AllArgsConstructor
//public class CommentController {
//
//
//    private CommentService commentService;
//
//    @PostMapping("/createComment")
//    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto) {
//        if (commentDto == null ||  commentDto.getCommentedUser() == null || commentDto.getCommentedUser().getUserID() == null) {
//            throw new IllegalArgumentException("Commented user information in CommentDto cannot be null");
//        }
//
//        if (commentDto.getTask() == null || commentDto.getTask().getTaskId() == null) {
//            throw new IllegalArgumentException("Task information in CommentDto cannot be null");
//        }
//
//
//        CommentResponseDto savedComment = commentService.createComment(commentDto);
//        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
//    }
///*
//    @PostMapping("/comments")
//    public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto) {
//        if (commentDto.getCommentedUser() == null) {
//            return ResponseEntity.badRequest().body("User information cannot be null");
//        }
//
//        try {
//            commentService.createComment(commentDto);
//            return ResponseEntity.ok("Comment created successfully");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }
//
//*/
//
//
//
//    @GetMapping("/task/{taskId}")
//    public ResponseEntity <List<CommentResponseDto>> getCommentsForTask(@PathVariable Long taskId){
//        List<CommentResponseDto> comments = commentService.getCommentsByTaskId(taskId);
//        return ResponseEntity.ok(comments);
//    }
//
//    @GetMapping("all")
//    public ResponseEntity <List<CommentDto>> getAllComment(){
//        List<CommentDto> comments = commentService.getAllComment();
//        return ResponseEntity.ok(comments);
//    }
//
//    @PutMapping("{id}")
//    public ResponseEntity<CommentDto>updateComment(@PathVariable("id") int commentId,@RequestBody CommentDto updateComment){
//        CommentDto commentDto =commentService.updateComment(commentId , updateComment);
//        return ResponseEntity.ok(commentDto);
//    }
//
//    @DeleteMapping("{id}")
//    public ResponseEntity<String> deleteComment(@PathVariable("id") int commentId ){
//        commentService.deleteComment(commentId);
//        return ResponseEntity.ok("Comment is delete successfully");
//
//    }
//
//}
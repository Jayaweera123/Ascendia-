package com.Ascendia.server.controller.SiteManager;

import com.Ascendia.server.dto.SiteManager.CommentDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseDto;
import com.Ascendia.server.service.SiteManager.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v2/comment")
@AllArgsConstructor
public class CommentController {


    private CommentService commentService;

    @PostMapping("createComment")
    public ResponseEntity<CommentResponseDto>createComment(@RequestBody CommentDto commentDto){
        CommentResponseDto savedComment = commentService.createComment(commentDto);
        return new ResponseEntity<>(savedComment , HttpStatus.CREATED);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity <List<CommentResponseDto>> getCommentsForTask(@PathVariable Long taskId){
        List<CommentResponseDto> comments = commentService.getCommentsByTaskId(taskId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping
    public ResponseEntity <List<CommentDto>> getAllComment(){
        List<CommentDto> comments = commentService.getAllComment();
        return ResponseEntity.ok(comments);
    }

    @PutMapping("{id}")
    public ResponseEntity<CommentDto>updateComment(@PathVariable("id") int commentId,@RequestBody CommentDto updateComment){
        CommentDto commentDto =commentService.updateComment(commentId , updateComment);
        return ResponseEntity.ok(commentDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") int commentId ){
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment is delete successfully");

    }

}
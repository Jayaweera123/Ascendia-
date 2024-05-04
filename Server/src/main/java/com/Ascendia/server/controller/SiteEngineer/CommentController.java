package com.Ascendia.server.controller.SiteEngineer;

import com.Ascendia.server.dto.SiteEngineer.CommentDto;
import com.Ascendia.server.service.SiteEngineer.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v2/comment")
@AllArgsConstructor
public class CommentController {


    private CommentService commentService;

    @PostMapping("createComment")
    public ResponseEntity<CommentDto>createComment(@RequestBody CommentDto commentDto){
        CommentDto savedComment = commentService.createComment(commentDto);
        return new ResponseEntity<>(savedComment , HttpStatus.CREATED);
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

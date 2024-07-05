package com.Ascendia.server.controller.SiteManager;

import com.Ascendia.server.dto.SiteManager.CommentJobDto;
import com.Ascendia.server.dto.SiteManager.CommentResponseJobDto;
import com.Ascendia.server.service.SiteManager.CommentJobService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("sengineer/commentJob")
@AllArgsConstructor
public class CommentJobController {

    private CommentJobService commentJobService;

    @PostMapping("/sengineer/comment/createJobComment")
    public ResponseEntity<CommentResponseJobDto>createJobComment(@RequestBody CommentJobDto commentJobDto){
        CommentResponseJobDto savedJobComment = commentJobService.createJobComment(commentJobDto);
        return new ResponseEntity<>(savedJobComment , HttpStatus.CREATED);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity <List<CommentResponseJobDto>> getCommentsForJob(@PathVariable Long jobId){
        List<CommentResponseJobDto> commentJobs = commentJobService.getJobCommentsByJobId(jobId);
        return ResponseEntity.ok(commentJobs);
    }

    @GetMapping
    public ResponseEntity <List<CommentJobDto>> getAllJobComment(){
        List<CommentJobDto> commentJobs = commentJobService.getAllJobComment();
        return ResponseEntity.ok(commentJobs);
    }

    @PutMapping("{id}")
    public ResponseEntity<CommentJobDto>updateJobComment(@PathVariable("id") int commentJobtId,@RequestBody CommentJobDto updateJobComment){
        CommentJobDto commentJobDto =commentJobService.updateJobComment(commentJobtId , updateJobComment);
        return ResponseEntity.ok(commentJobDto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJobComment(@PathVariable("id") int commentJobId ){
        commentJobService.deleteJobComment(commentJobId);
        return ResponseEntity.ok("CommentJob is delete successfully");

    }

}
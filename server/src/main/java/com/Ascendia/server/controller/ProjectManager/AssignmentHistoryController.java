package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.service.ProjectManager.AssignmentHistoryService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/pmanager/history")
public class AssignmentHistoryController {

    @Autowired
    private AssignmentHistoryService assignmentHistoryService;


    /*@PostMapping("/add")
    public ResponseEntity<AssignmentHistoryDto> addRecord(@RequestBody AssignmentHistoryDto assignmentHistoryDto) {
        AssignmentHistoryDto savedRecord = assignmentHistoryService.createHistoryRecord(assignmentHistoryDto);
        return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    }*/

    @GetMapping("/{projectId}/records")
    public ResponseEntity<List<AssignmentHistoryDto>> getRecordsByProjectId(@PathVariable Long projectId) {
        List<AssignmentHistoryDto> records = assignmentHistoryService.getRecordsByProjectId(projectId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{Id}/duration")
    public String getDuration(@PathVariable Long Id) {
        AssignmentHistoryDto assignmentHistoryDto = assignmentHistoryService.getRecordById(Id);
        return assignmentHistoryService.calculateDuration(assignmentHistoryDto);
    }
    @GetMapping("/search/{projectId}")
    public ResponseEntity<List<AssignmentHistoryDto>> searchRecordbyNameORDep(@PathVariable Long projectId, @RequestParam("query") String query){
        return ResponseEntity.ok(assignmentHistoryService.searchRecord(projectId, query));
    }

}

package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import com.Ascendia.server.service.ProjectManager.UserProjectAssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/project/user")
public class UserProjectAssignmentController {

    private UserProjectAssignmentService userProjectAssignmentService;
    @PostMapping("/add")
    public ResponseEntity<UserProjectAssignmentDto> addAssignment(@RequestBody UserProjectAssignmentDto userProjectAssignmentDto) {
        UserProjectAssignmentDto savedAssignment = userProjectAssignmentService.addAssignment(userProjectAssignmentDto);
        return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}/all")
    public ResponseEntity<List<UserProjectAssignmentDto>> getAssignmentsForProject(@PathVariable Long projectId) {
        List<UserProjectAssignmentDto> assignments = userProjectAssignmentService.getAssignsByProjectId(projectId);
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable("id") Long assignmetnId) {
        userProjectAssignmentService.deleteAssignmentById(assignmetnId);
        return ResponseEntity.ok("User Removed from the project successfully");
    }

    @DeleteMapping("remove/all//{projectId}/")
    public ResponseEntity<String> deleteAllAssignmentsForProject(@PathVariable Long projectId) {
        userProjectAssignmentService.deleteAssignmentsByProjectId(projectId);
        return ResponseEntity.ok("All the users Removed from the project "+ projectId + " successfully");
    }




}

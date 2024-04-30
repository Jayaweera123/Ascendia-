package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {


    private ProjectService projectService;

    //Build AddProject REST API
    @PostMapping("/createProject")
    public ResponseEntity<ProjectDto> createProject(@ModelAttribute ProjectDto projectDto,
                                                    @RequestParam("profileImage") MultipartFile profileImage){
        ProjectDto savedProject = projectService.createProject(projectDto, profileImage);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectGetDto>>  getAllProjects() {
        List<ProjectGetDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProjectByName(@PathVariable Long projectId) {
        try {
            projectService.deleteProjectById(projectId);
            return ResponseEntity.ok("Successfully deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid name");
        }
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDto> updateProjectById(@PathVariable Long projectId,
                                                          @RequestBody ProjectDto projectDto) {
        try {
            ProjectDto updatedProject = projectService.updateProjectById(projectId, projectDto);
            return ResponseEntity.ok(updatedProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}

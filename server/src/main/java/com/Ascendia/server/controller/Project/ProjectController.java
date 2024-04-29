package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<List<ProjectDto>>  getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
}

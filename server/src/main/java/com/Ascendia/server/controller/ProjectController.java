package com.Ascendia.server.controller;

import com.Ascendia.server.dto.ProjectDto;
import com.Ascendia.server.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private ProjectService projectService;

    //Build Add Project Rest API
    @PostMapping
    public ResponseEntity<ProjectDto>createProject (@RequestBody ProjectDto projectDto){
        ProjectDto savedProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }
}

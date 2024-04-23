package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
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

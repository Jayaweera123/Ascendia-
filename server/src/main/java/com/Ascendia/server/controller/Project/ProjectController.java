package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {


    private ProjectService projectService;

    //Build AddProject REST API
    @PostMapping("/createProject")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto){
        ProjectDto savedProject = projectService.createProject(projectDto);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable("id") Long projectId) {
        ProjectDto projectDto = projectService.getProjectId(projectId);
        return ResponseEntity.ok(projectDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>>  getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("pm/{pmId}")
    public ResponseEntity<List<ProjectDto>>  getProjectsByPMId(@PathVariable("pmId") String pmId){
        List<ProjectDto> projects = projectService.getProjectsByPmId(pmId);
        return ResponseEntity.ok(projects);
    }

}

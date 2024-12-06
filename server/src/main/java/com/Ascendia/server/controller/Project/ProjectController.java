package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.service.Project.ProjectService;
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
@RequestMapping("/api/project")
public class ProjectController {


    private ProjectService projectService;
    private TaskService taskService;

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

    //Nethuni
    @GetMapping("pm/{pmId}")
    public ResponseEntity<List<ProjectDto>>  getProjectsByPMId(@PathVariable("pmId") Long pmId){
        List<ProjectDto> projects = projectService.getProjectsByPmId(pmId);
        return ResponseEntity.ok(projects);
    }

    //Build search REST API
    @GetMapping("/search/{pmId}")
    public ResponseEntity<List<ProjectDto>> searchProject(@PathVariable Long pmId, @RequestParam("query") String query){
        return ResponseEntity.ok(projectService.searchProject(pmId, query));
    }

    @GetMapping("/duration/{projectId}")
    public String getDuration(@PathVariable("projectId") Long projectId) {
        ProjectDto projectDto = projectService.getProjectId(projectId);
        return projectService.calculateDuration(projectDto);
    }

    @GetMapping("/{projectId}/jobs/count")
    public Long getTotalJobsForProject(@PathVariable Long projectId) {
        return projectService.getTotalJobsForProject(projectId);
    }

    @GetMapping("/{projectId}/completed/jobs/count")
    public Long getCOmpletedJobsForProject(@PathVariable Long projectId) {
        return projectService.getCompletedJobsCountForProject(projectId);
    }

    @GetMapping("/{projectId}/employees/count")
    public Long getEmployeeCountForProject(@PathVariable Long projectId) {
        return projectService.getEmployeeCountForProject(projectId);
    }

    @GetMapping("/{projectId}/task/count")
    public ResponseEntity<Integer> getTaskCountForProject(@PathVariable Long projectId) {
        int taskCount = projectService.getTaskCountForProject(projectId);
        return ResponseEntity.ok(taskCount);
    }

}

package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.service.Project.ProjectService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class ProjectController {


    private ProjectService projectService;
    private TaskService taskService;

    @PostMapping("/project/createProject")
    public ResponseEntity<ProjectDto> createProject(@ModelAttribute ProjectDto projectDto,
                                                    @RequestParam("profileImage") MultipartFile profileImage){
        ProjectDto savedProject = projectService.createProject(projectDto, profileImage);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/project/all")
    public ResponseEntity<List<ProjectGetDto>>  getAllProjects() {
        List<ProjectGetDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<String> deleteProjectByName(@PathVariable Long projectId) {
        try {
            projectService.deleteProjectById(projectId);
            return ResponseEntity.ok("Successfully deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid name");
        }
    }

    @PutMapping("/project/{projectId}")
    public ResponseEntity<ProjectDto> updateProjectById(@PathVariable Long projectId,
                                                          @RequestBody ProjectDto projectDto) {
        try {
            ProjectDto updatedProject = projectService.updateProjectById(projectId, projectDto);
            return ResponseEntity.ok(updatedProject);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable("id") Long projectId) {
        ProjectDto projectDto = projectService.getProjectId(projectId);
        return ResponseEntity.ok(projectDto);
    }

    
    //Nethuni
    @GetMapping("/pmanager/pm/{pmId}")
    public ResponseEntity<List<ProjectDto>>  getProjectsByPMId(@PathVariable("pmId") String pmId){
        List<ProjectDto> projects = projectService.getProjectsByPmId(pmId);
        return ResponseEntity.ok(projects);
    }

    //Build search REST API
    @GetMapping("/pmanager/search/{pmId}")
    public ResponseEntity<List<ProjectDto>> searchProject(@PathVariable String pmId, @RequestParam("query") String query){
        return ResponseEntity.ok(projectService.searchProject(pmId, query));
    }

    /*@GetMapping("/pmanager/duration/{projectId}")
    public String getDuration(@PathVariable("projectId") Long projectId) {
        ProjectDto projectDto = projectService.getProjectId(projectId);
        return projectService.calculateDuration(projectDto);
    }*/

    @GetMapping("/pmanager/{projectId}/jobs/count")
    public Long getTotalJobsForProject(@PathVariable Long projectId) {
        return projectService.getTotalJobsForProject(projectId);
    }

    @GetMapping("/pmanager/{projectId}/completed/jobs/count")
    public Long getCOmpletedJobsForProject(@PathVariable Long projectId) {
        return projectService.getCompletedJobsCountForProject(projectId);
    }

    @GetMapping("/pmanager/{projectId}/employees/count")
    public Long getEmployeeCountForProject(@PathVariable Long projectId) {
        return projectService.getEmployeeCountForProject(projectId);
    }

    @GetMapping("/pmanager/{projectId}/task/count")
    public ResponseEntity<Integer> getTaskCountForProject(@PathVariable Long projectId) {
        int taskCount = projectService.getTaskCountForProject(projectId);
        return ResponseEntity.ok(taskCount);
    }

}

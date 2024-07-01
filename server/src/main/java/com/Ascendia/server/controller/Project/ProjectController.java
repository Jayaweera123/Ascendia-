package com.Ascendia.server.controller.Project;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.dto.Project.PmDto;
import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.dto.ProjectManager.TaskUpdateDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.dto.Project.ProjectManagerUpdateDto;
import com.Ascendia.server.service.Project.ProjectService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class ProjectController {


    private ProjectService projectService;
    private TaskService taskService;

    @PostMapping("/project/createProject")
    public ResponseEntity<ProjectDto> createProject(@ModelAttribute ProjectDto projectDto,
                                                    @RequestParam("profileImage") MultipartFile profileImage,
                                                    @RequestParam("projectManagerFirstName") String projectManagerFirstName,
                                                    @RequestParam("projectManagerLastName") String projectManagerLastName,
                                                    @RequestParam("clientFirstName") String clientFirstName,
                                                    @RequestParam("clientLastName") String clientLastName,
                                                    @RequestParam("consultantFirstName") String consultantFirstName,
                                                    @RequestParam("consultantLastName") String consultantLastName){
        ProjectDto savedProject = projectService.createProject(projectDto, profileImage, projectManagerFirstName, projectManagerLastName, clientFirstName, clientLastName, consultantFirstName, consultantLastName);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("/project/all")
    public ResponseEntity<List<ProjectDto>>  getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/project/{projectId}")
    public ResponseEntity<String> deactivateProjectById(@PathVariable Long projectId, @RequestHeader("Authorization") String token) {
        // Your logic to verify the token if needed
        try {
            projectService.deactivateProjectById(projectId);
            return ResponseEntity.ok("Project successfully deactivated");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid ID");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }

    @PutMapping(value = "/project/update/{projectId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectDto> updateProjectById(
            @PathVariable Long projectId,
            @ModelAttribute ProjectDto updatedProject,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "newProjectManagerFirstName", required = false) String newProjectManagerFirstName,
            @RequestParam(value = "newProjectManagerLastName", required = false) String newProjectManagerLastName,
            @RequestParam(value = "newClientFirstName", required = false) String newClientFirstName,
            @RequestParam(value = "newClientLastName", required = false) String newClientLastName,
            @RequestParam(value = "newConsultantFirstName", required = false) String newConsultantFirstName,
            @RequestParam(value = "newConsultantLastName", required = false) String newConsultantLastName){

        // Update the project using the service
        ProjectDto updatedProjectDto = projectService.updateProjectById(
                projectId,
                updatedProject,
                profileImage,
                newProjectManagerFirstName,
                newProjectManagerLastName,
                newClientFirstName,
                newClientLastName,
                newConsultantFirstName,
                newConsultantLastName
        );
        // Return the response
        return ResponseEntity.ok(updatedProjectDto);
    }

    @GetMapping("/progress/{projectId}")
    public ResponseEntity<ProjectGetDto> getProjectByProjectId(@PathVariable Long projectId) {
        ProjectGetDto projectGetDto = projectService.getProjectByProjectId(projectId);
        if (projectGetDto == null) {
            // Return a default ProjectGetDto with progress set to 0
            projectGetDto = new ProjectGetDto();
            projectGetDto.setProgress(0); // Assuming ProjectGetDto has a setProgress method
        }
        return ResponseEntity.ok(projectGetDto);
    }


    @PutMapping("/project/updateProjectManager")
    public ResponseEntity<Void> updateProjectManager(@PathVariable Long projectId, @RequestBody ProjectManagerUpdateDto projectManagerUpdateDto) {
        projectManagerUpdateDto.setProjectId(projectId);
        projectService.updateProjectManager(projectManagerUpdateDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("project/{projectId}/pm")
    public String updateProjectPM(@PathVariable Long projectId, @RequestBody PmDto pmDto) {
        // Update the project
        return projectService.updatePM(projectId, pmDto);
    }

    @GetMapping("/project/count/completed")
    public ResponseEntity<Long> countCompletedProjects() {
        Long count = projectService.countCompletedProjects();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/project/count/inprogress")
    public ResponseEntity<Long> countInProgressProjects() {
        Long count = projectService.countInProgressProjects();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/project/count/cancelled")
    public ResponseEntity<Long> countCancelledProjects() {
        Long count = projectService.countCancelledProjects();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/project/count/pending")
    public ResponseEntity<Long> countPendingProjects() {
        Long count = projectService.countPendingProjects();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/project/count/completed/byYear")
    public ResponseEntity<Map<Integer, Long>> countCompletedProjectsByYear() {
        return ResponseEntity.ok(projectService.countCompletedProjectsByYear());
    }

    @GetMapping("/project/count/inProgress/byYear")
    public ResponseEntity<Map<Integer, Long>> countInProgressProjectsByYear() {
        return ResponseEntity.ok(projectService.countInProgressProjectsByYear());
    }

    @GetMapping("/project/count/cancelled/byYear")
    public ResponseEntity<Map<Integer, Long>> countCancelledProjectsByYear() {
        return ResponseEntity.ok(projectService.countCancelledProjectsByYear());
    }

    @GetMapping("/project/count/pending/byYear")
    public ResponseEntity<Map<Integer, Long>> countPendingProjectsByYear() {
        return ResponseEntity.ok(projectService.countPendingProjectsByYear());
    }

    @GetMapping("/project/residential/count-by-year")
    public List<Map<String, Object>> getResidentialProjectsCountByYear() {
        return projectService.getResidentialProjectsCountByYear();
    }

    @GetMapping("/project/commercial/count-by-year")
    public List<Map<String, Object>> getCommercialProjectsCountByYear() {
        return projectService.getCommercialProjectsCountByYear();
    }

    @GetMapping("/project/industrial/count-by-year")
    public List<Map<String, Object>> getIndustrialProjectsCountByYear() {
        return projectService.getIndustrialProjectsCountByYear();
    }

    @GetMapping("/project/infrastructure/count-by-year")
    public List<Map<String, Object>> getInfrastructureProjectsCountByYear() {
        return projectService.getInfrastructureProjectsCountByYear();
    }

    @GetMapping("/project/other/count-by-year")
    public List<Map<String, Object>> getOtherProjectsCountByYear() {
        return projectService.getOtherProjectsCountByYear();
    }


    //Nethuni
    @GetMapping("/pmanager/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable("id") Long projectId) {
        ProjectDto projectDto = projectService.getProjectId(projectId);
        return ResponseEntity.ok(projectDto);
    }


    @GetMapping("/pmanager/{pmId}/all")
    public ResponseEntity<List<ProjectGetDto>>  getProjectsByPMId(@PathVariable("pmId") Long pmId){
        List<ProjectGetDto> projects = projectService.getProjectsByPmId(pmId);
        return ResponseEntity.ok(projects);
    }

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

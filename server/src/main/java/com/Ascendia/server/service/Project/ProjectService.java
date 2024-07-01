package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.PmDto;
import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProjectService {

    List<ProjectGetDto> getProjectsForUser(User user);

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage, String clientFirstName, String clientLastName, String consultantFirstName, String consultantLastName);

    List<ProjectDto> getAllProjects();

    void deactivateProjectById(Long projectId);

    ProjectDto updateProjectById(Long projectId, ProjectDto projectDto, MultipartFile profileImage,
                                 String newClientFirstName, String newClientLastName,
                                 String newConsultantFirstName, String newConsultantLastName);

    ProjectGetDto getProjectByProjectId(Long projectId);

    //Nethuni
    ProjectDto getProjectId(Long projectId);

    List<ProjectGetDto> getProjectsByPmId(Long pmId);

    //List<ProjectDto> getProjectsByPmId(String pmId);


    //List<ProjectDto> searchProject(String pmId, String query);

    //String calculateDuration(ProjectDto projectDto);

    Long getTotalJobsForProject(Long projectId);

    Long getCompletedJobsCountForProject(Long projectId);

    Long getEmployeeCountForProject(Long projectId);

    int getTaskCountForProject(Long projectId);

    String updatePM(Long projectId, PmDto updatedPm);

    Long countCompletedProjects();
    Long countInProgressProjects();
    Long countCancelledProjects();
    Long countPendingProjects();

    Map<Integer, Long> countCompletedProjectsByYear();
    Map<Integer, Long> countInProgressProjectsByYear();
    Map<Integer, Long> countCancelledProjectsByYear();
    Map<Integer, Long> countPendingProjectsByYear();

}
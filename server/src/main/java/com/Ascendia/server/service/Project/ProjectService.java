package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage);

    List<ProjectGetDto> getAllProjects();

    void deleteProjectById(Long projectId);

    ProjectDto updateProjectById(Long projectId, ProjectDto projectDto);

    //Nethuni
    ProjectDto getProjectId(Long projectId);

    List<ProjectDto> getProjectsByPmId(Long pmId);

    List<ProjectDto> searchProject(Long pmId, String query);

    String calculateDuration(ProjectDto projectDto);

    Long getTotalJobsForProject(Long projectId);

    Long getCompletedJobsCountForProject(Long projectId);

    Long getEmployeeCountForProject(Long projectId);

    int getTaskCountForProject(Long projectId);



}

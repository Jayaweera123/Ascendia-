package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto);

    List<ProjectDto> getAllProjects();

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

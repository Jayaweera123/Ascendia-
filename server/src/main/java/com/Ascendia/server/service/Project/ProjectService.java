package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto);

    List<ProjectDto> getAllProjects();

    ProjectDto getProjectId(Long projectId);



}

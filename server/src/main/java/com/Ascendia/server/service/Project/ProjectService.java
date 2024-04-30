package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage);

    List<ProjectGetDto> getAllProjects();

    void deleteProjectById(Long projectId);

    ProjectDto updateProjectById(Long projectId, ProjectDto projectDto);


}

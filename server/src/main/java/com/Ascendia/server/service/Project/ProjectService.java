package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage);

    List<ProjectDto> getAllProjects();


}

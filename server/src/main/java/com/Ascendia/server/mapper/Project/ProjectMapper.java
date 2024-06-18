package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.dto.Project.ProjectDto;

//import java.util.stream.Collectors;

public class ProjectMapper {
    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getProjectName(),
                project.getProjectType(),
                project.getProjectDescription(),
                project.getProjectStatus(),
                project.getCreatedDate(),
                project.getEndDate(),
                project.getPmId(),
                project.getImage()
        );
    }

    public static Project mapProject(ProjectDto projectDto) {
        return new Project(
                projectDto.getProjectName(),
                projectDto.getProjectType(),
                projectDto.getProjectDescription(),
                projectDto.getProjectStatus(),
                projectDto.getCreatedDate(),
                projectDto.getEndDate(),
                projectDto.getPmId(),
                projectDto.getImage()
        );
    }

}

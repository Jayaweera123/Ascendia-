package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.entity.Project.Project;

public class ProjectMapper {
    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getProjectId(),
                project.getProjectName(),
                project.getPDiscription(),
                project.getStatus(),
                project.getCreatedDate(),
                project.getPmId(),
                project.getImage()

        );
    }

    public static Project mapToProject(ProjectDto projectDto) {
        return new Project (
                projectDto.getProjectId(),
                projectDto.getProjectName(),
                projectDto.getPDiscription(),
                projectDto.getStatus(),
                projectDto.getCreatedDate(),
                projectDto.getPmId(),
                projectDto.getImage()

        );
    }
}
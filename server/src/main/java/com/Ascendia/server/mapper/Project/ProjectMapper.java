package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.entity.Project.Project;

public class ProjectMapper {
    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getProjectId(),
                project.getProjectName(),
                project.getProjectType(),
                project.getProjectDescription(),
                project.getProjectStatus(),
                project.getCreatedDate(),
                project.getEndDate(),
                project.getPmId(),
                project.getImage());
    }

    public static Project mapProject(ProjectDto projectDto) {
        return new Project(
                projectDto.getProjectId(), // Convert String to Long
                projectDto.getProjectName(),
                projectDto.getProjectType(),
                projectDto.getProjectDescription(),
                projectDto.getProjectStatus(),
                projectDto.getProjectType(),
                projectDto.getProjectDescription(),
                projectDto.getProjectStatus(),
                projectDto.getCreatedDate(),
                projectDto.getEndDate(),
                projectDto.getEndDate(),
                projectDto.getPmId(),
                projectDto.getImage());
    }

}

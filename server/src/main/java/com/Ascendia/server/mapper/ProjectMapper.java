package com.Ascendia.server.mapper;

import com.Ascendia.server.dto.ProjectDto;
import com.Ascendia.server.entity.Project;

import java.time.LocalDate;

public class ProjectMapper {
    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                String.valueOf(project.getProjectId()), // Convert Long to String
                project.getPTitle(),
                project.getPType(),
                project.getPDescription(),
                project.getPStatus(),
                project.getCreatedDate(),
                project.getEndDate(),
                project.getPmId(),
                project.getGmId(),
                project.getImage()
        );
    }

    public static Project mapProject(ProjectDto projectDto) {
        return new Project(
                Long.valueOf(projectDto.getProjectId()), // Convert String to Long
                projectDto.getPTitle(),
                projectDto.getPType(),
                projectDto.getPDescription(),
                projectDto.getPStatus(),
                projectDto.getCreatedDate(),
                projectDto.getEndDate(),
                projectDto.getPmId(),
                projectDto.getGmId(),
                projectDto.getImage()
        );
    }
}






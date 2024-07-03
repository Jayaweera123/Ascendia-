package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.dto.Project.ProjectDto;

//import java.util.stream.Collectors;

public class ProjectMapper {
    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(
                project.getProjectId(),
                project.getProjectName(),
                project.getProjectType(),
                project.getLocation(),
                project.getProjectDescription(),
                project.getProjectStatus(),
                project.getCreatedDate(),
                project.getEndDate(),
                project.getImage(),
                project.getProjectManager() != null ? project.getProjectManager().getFirstName() : null,
                project.getProjectManager() != null ? project.getProjectManager().getLastName() : null,
                project.getClient() != null ? project.getClient().getFirstName() : null,
                project.getClient() != null ? project.getClient().getLastName() : null,
                project.getConsultant() != null ? project.getConsultant().getFirstName() : null,
                project.getConsultant() != null ? project.getConsultant().getLastName() : null
        );
    }

    public static Project mapProject(ProjectDto projectDto) {
        Project project = new Project();
        project.setProjectName(projectDto.getProjectName());
        project.setProjectType(projectDto.getProjectType());
        project.setLocation(projectDto.getLocation());
        project.setProjectDescription(projectDto.getProjectDescription());
        project.setProjectStatus(projectDto.getProjectStatus());
        project.setCreatedDate(projectDto.getCreatedDate());
        project.setEndDate(projectDto.getEndDate());
        project.setImage(projectDto.getImage());
        return project;
    }



}

package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Project.Project;

public class ProjectGetMapper {
    public static ProjectGetDto mapToProjectGetDto(Project project) {
        return new ProjectGetDto(
                project.getProjectId(),
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
    public static Project mapToProject(ProjectGetDto projectGetDto) {
        Project project = new Project();
        project.setProjectId(projectGetDto.getProjectId());
        project.setProjectName(projectGetDto.getProjectName());
        project.setProjectType(projectGetDto.getProjectType());
        project.setProjectDescription(projectGetDto.getProjectDescription());
        project.setProjectStatus(projectGetDto.getProjectStatus());
        project.setCreatedDate(projectGetDto.getCreatedDate());
        project.setEndDate(projectGetDto.getEndDate());
        project.setPmId(projectGetDto.getPmId());
        project.setImage(projectGetDto.getImage());
        return project;
    }
}

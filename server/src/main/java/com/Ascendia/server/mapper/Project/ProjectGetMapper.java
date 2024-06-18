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
        return new Project(
                projectGetDto.getProjectId(),
                projectGetDto.getProjectName(),
                projectGetDto.getProjectType(),
                projectGetDto.getProjectDescription(),
                projectGetDto.getProjectStatus(),
                projectGetDto.getCreatedDate(),
                projectGetDto.getEndDate(),
                projectGetDto.getPmId(),
                projectGetDto.getImage()
        );
    }

}

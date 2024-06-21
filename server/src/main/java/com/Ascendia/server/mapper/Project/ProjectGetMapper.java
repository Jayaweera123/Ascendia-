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
                //project.getPmId(),
                project.getImage(),
                project.getProgress()

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
        //project.setPmId(projectGetDto.getPmId());
        project.setImage(projectGetDto.getImage());
        project.setProgress(projectGetDto.getProgress());

        return project;
    }

    /*private ProjectGetDto mapToProjectDto(Project project) {
        ProjectGetDto projectDto = new ProjectGetDto();
        projectDto.setProjectId(project.getProjectId());
        projectDto.setProjectName(project.getProjectName());
        projectDto.setProjectType(project.getProjectType());
        projectDto.setProjectDescription(project.getProjectDescription());
        projectDto.setProjectStatus(project.getProjectStatus());
        projectDto.setCreatedDate(project.getCreatedDate());
        projectDto.setEndDate(project.getEndDate());
        //projectDto.setPmId(project.getProjectManager() != null ? project.getProjectManager().getUserID().toString() : null);
        projectDto.setImage(project.getImage());

        return projectDto;
    }*/
}

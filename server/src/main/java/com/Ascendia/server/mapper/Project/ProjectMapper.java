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
                project.getProjectDescription(),
                project.getProjectStatus(),
                project.getCreatedDate(),
                project.getEndDate(),
                project.getImage(),
                project.getProjectManager(),
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
        project.setProjectDescription(projectDto.getProjectDescription());
        project.setProjectStatus(projectDto.getProjectStatus());
        project.setCreatedDate(projectDto.getCreatedDate());
        project.setEndDate(projectDto.getEndDate());
        //project.setPmId(projectDto.getPmId());
        project.setImage(projectDto.getImage());
        project.setProjectManager(projectDto.getProjectManager());

        return project;
    }

        /*project.setProjectId(projectDto.getProjectId());
        project.setProjectName(projectDto.getProjectName());
        project.setProjectType(projectDto.getProjectType());
        project.setProjectDescription(projectDto.getProjectDescription());
        project.setProjectStatus(projectDto.getProjectStatus());
        project.setCreatedDate(projectDto.getCreatedDate());
        project.setEndDate(projectDto.getEndDate());
        project.setPmId(projectDto.getPmId());
        project.setImage(projectDto.getImage());

        // Tasks mapping can be added if needed, assuming Task and TaskDto have a similar structure
        // project.setTasks(projectDto.getTasks().stream().map(TaskDto::mapToTask).collect(Collectors.toList()));


        return project;*/

}

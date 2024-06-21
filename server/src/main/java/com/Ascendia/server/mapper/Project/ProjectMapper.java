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
                project.getProjectManager(),
                project.getImage()
        );
    }

    public static Project mapToProject(ProjectDto projectDto) {
        Project project = new Project();

        project.setProjectId(projectDto.getProjectId());
        project.setProjectName(projectDto.getProjectName());
        project.setProjectType(projectDto.getProjectType());
        project.setProjectDescription(projectDto.getProjectDescription());
        project.setProjectStatus(projectDto.getProjectStatus());
        project.setCreatedDate(projectDto.getCreatedDate());
        project.setEndDate(projectDto.getEndDate());
        project.setImage(projectDto.getImage());
        project.setProjectManager(projectDto.getProjectManger());

        // Tasks mapping can be added if needed, assuming Task and TaskDto have a similar structure
        // project.setTasks(projectDto.getTasks().stream().map(TaskDto::mapToTask).collect(Collectors.toList()));


        return project;
    }
}

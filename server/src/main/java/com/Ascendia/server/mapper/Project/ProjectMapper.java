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

        project.setProjectId(projectDto.getProjectId());
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


        return project;
    }
}

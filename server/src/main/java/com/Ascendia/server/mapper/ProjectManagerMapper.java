package com.Ascendia.server.mapper;

import com.Ascendia.server.dto.ProjectDto;
import com.Ascendia.server.dto.ProjectManagerDto;
import com.Ascendia.server.entity.Project.ProjectManager;

public class ProjectManagerMapper {

    public static ProjectManagerDto mapToProjectManagerDto(ProjectManager projectManager){
        return new ProjectManagerDto(
                projectManager.getId(),
                projectManager.getFirstName(),
                projectManager.getLastName(),
                projectManager.getEmail(),
                projectManager.getAssignDate()

        );
    }
    public static ProjectManager mapToProjectManager(ProjectManagerDto projectManagerDto){
        return new ProjectManager(
                projectManagerDto.getId(),
                projectManagerDto.getFirstName(),
                projectManagerDto.getLastName(),
                projectManagerDto.getEmail(),
                projectManagerDto.getAssignDate()

        );
    }
}


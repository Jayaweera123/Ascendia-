package com.Ascendia.server.mapper.Project;

import com.Ascendia.server.dto.Project.ProjectManagerUpdateDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.Administrator.User;

public class ProjectManagerUpdateMapper {
    public static void updateProjectManager(Project project, User projectManager) {
        project.setProjectManager(projectManager);
    }
}
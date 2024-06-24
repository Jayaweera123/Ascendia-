package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;

import java.util.List;

public interface UserProjectAssignmentService {
    UserProjectAssignmentDto addAssignment(UserProjectAssignmentDto assignmentDto);

    List<UserProjectAssignmentDto> getAssignsByProjectId(Long projectId);

    List<UserProjectAssignmentDto> searchAssignment(Long projectId, String query);

    List<Project> getProjectsByAssignedUser(User assignedUser);
}

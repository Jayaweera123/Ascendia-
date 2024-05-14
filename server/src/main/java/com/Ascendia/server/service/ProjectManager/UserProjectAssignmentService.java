package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;

import java.util.List;

public interface UserProjectAssignmentService {
    UserProjectAssignmentDto addAssignment(UserProjectAssignmentDto assignmentDto);

    List<UserProjectAssignmentDto> getAssignsByProjectId(Long projectId);

    void deleteAssignmentById(Long assignmentId);

    void deleteAssignmentsByProjectId(Long projectId);


}

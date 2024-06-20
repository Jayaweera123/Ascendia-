package com.Ascendia.server.mapper.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;

import java.time.LocalDate;

public class UserProjectAssignmentMapper {
    public static UserProjectAssignmentDto mapToUserProjectAssignmentDto(UserProjectAssignment assignment) {
        return new UserProjectAssignmentDto(
                assignment.getId(),
                assignment.getProject(),
                assignment.getAssignedUser(),
                assignment.getAssignedByUser(),
                assignment.getAssignedDate(),
                assignment.getAssignmentStatus()
        );
    }

    public static UserProjectAssignment mapToUserProjectAssignment(UserProjectAssignmentDto assignmentDto) {
        return new UserProjectAssignment(
                assignmentDto.getId(),
                assignmentDto.getProject(),
                assignmentDto.getAssignedUser(),
                assignmentDto.getAssignedByUser(),
                assignmentDto.getAssignedDate(),
                assignmentDto.getAssignmentStatus()
        );
    }
}

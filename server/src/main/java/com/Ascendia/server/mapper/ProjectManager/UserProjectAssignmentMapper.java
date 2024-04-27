package com.Ascendia.server.mapper.ProjectManager;


import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;

public class UserProjectAssignmentMapper {
    public static UserProjectAssignmentDto mapToUserProjectAssignmentDto(UserProjectAssignment userProjectAssignment) {
        return new UserProjectAssignmentDto(
                userProjectAssignment.getId(),
                userProjectAssignment.getUser(),
                userProjectAssignment.getProject(),
                userProjectAssignment.getAssignmentDate(),
                userProjectAssignment.getEndDate(),
                userProjectAssignment.getAssignmentStatus(),
                userProjectAssignment.getAssignedBy()
        );
    }

    public static UserProjectAssignment mapToUserProjectAssignment(UserProjectAssignmentDto userProjectAssignmentDto) {
        return new UserProjectAssignment (
                userProjectAssignmentDto.getId(),
                userProjectAssignmentDto.getUser(),
                userProjectAssignmentDto.getProject(),
                userProjectAssignmentDto.getAssignmentDate(),
                userProjectAssignmentDto.getEndDate(),
                userProjectAssignmentDto.getAssignmentStatus(),
                userProjectAssignmentDto.getAssignedBy()
        );
    }




}

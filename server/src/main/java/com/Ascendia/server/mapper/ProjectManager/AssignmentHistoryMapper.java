package com.Ascendia.server.mapper.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryGetDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;


public class AssignmentHistoryMapper {
    public static AssignmentHistoryDto mapToAssignmentHistoryDto(AssignmentHistory historyRecord) {
        return new AssignmentHistoryDto(
                historyRecord.getRecordId(),
                historyRecord.getProject(),
                historyRecord.getAssignedUser(),
                historyRecord.getAssignmentType(),
                historyRecord.getAssignedByUser(),
                historyRecord.getRemovedByUser(),
                historyRecord.getAssignmentStartDate(),
                historyRecord.getAssignmentEndDate()

        );
    }

    public static AssignmentHistory mapToAssignmentHistory(AssignmentHistoryDto historyRecordDto) {
        return new AssignmentHistory (
                historyRecordDto.getRecordId(),
                historyRecordDto.getProject(),
                historyRecordDto.getAssignedUser(),
                historyRecordDto.getAssignmentType(),
                historyRecordDto.getAssignedByUser(),
                historyRecordDto.getRemovedByUser(),
                historyRecordDto.getAssignmentStartDate(),
                historyRecordDto.getAssignmentEndDate()

        );
    }

    public static AssignmentHistoryGetDto mapToAssignmentHistoryGetDto(AssignmentHistory historyRecord) {
        return new AssignmentHistoryGetDto (
                historyRecord.getRecordId(),
                historyRecord.getProject().getProjectName(),
                historyRecord.getAssignedUser().getFirstName() +" "+ historyRecord.getAssignedByUser().getLastName(),
                historyRecord.getAssignedUser().getProfilePicUrl(),
                historyRecord.getAssignedUser().getDesignation(),
                historyRecord.getAssignedUser().getDepartment(),
                historyRecord.getAssignedByUser().getFirstName() +" "+ historyRecord.getAssignedByUser().getLastName(),
                historyRecord.getAssignedByUser().getProfilePicUrl(),
                historyRecord.getAssignedByUser().getDesignation(),
                historyRecord.getAssignedByUser().getDepartment(),
                historyRecord.getRemovedByUser().getFirstName() +" "+ historyRecord.getRemovedByUser().getLastName(),
                historyRecord.getRemovedByUser().getProfilePicUrl(),
                historyRecord.getRemovedByUser().getDesignation(),
                historyRecord.getRemovedByUser().getDepartment(),
                historyRecord.getAssignmentStartDate(),
                historyRecord.getAssignmentEndDate(),
                historyRecord.getAssignmentType()
        );
    }
}

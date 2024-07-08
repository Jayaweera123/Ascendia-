package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryGetDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;

import java.time.Period;
import java.util.List;

public interface AssignmentHistoryService {

    AssignmentHistoryDto createHistoryRecord(AssignmentHistoryDto assignmentHistoryDto);

    List<AssignmentHistoryGetDto> getRecordsByProjectId(Long projectId);

    public AssignmentHistoryGetDto getRecordById(Long Id);

    String calculateDuration(AssignmentHistoryGetDto assignmentHistoryDto);

    List<AssignmentHistoryGetDto> searchRecord(Long projectId, String query);
}

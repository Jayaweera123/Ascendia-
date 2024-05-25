package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;

import java.time.Period;
import java.util.List;

public interface AssignmentHistoryService {

    AssignmentHistoryDto createHistoryRecord(AssignmentHistoryDto assignmentHistoryDto);

    List<AssignmentHistoryDto> getRecordsByProjectId(Long projectId);

    public AssignmentHistoryDto getRecordById(Long Id);

    String calculateDuration(AssignmentHistoryDto assignmentHistoryDto);

    List<AssignmentHistoryDto> searchRecord(Long projectId, String query);
}

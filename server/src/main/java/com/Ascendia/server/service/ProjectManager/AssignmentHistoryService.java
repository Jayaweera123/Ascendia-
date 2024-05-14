package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;

public interface AssignmentHistoryService {

    AssignmentHistoryDto createHistoryRecord(AssignmentHistoryDto assignmentHistoryDto);
}

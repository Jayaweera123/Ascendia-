package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;

public interface TaskEditHistoryService {

    void createRecord(TaskEditHistoryDto taskEditHistoryDto);
}

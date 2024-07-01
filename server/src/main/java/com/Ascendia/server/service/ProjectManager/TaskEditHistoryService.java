package com.Ascendia.server.service.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryGetDto;
import com.Ascendia.server.dto.SiteManager.JobGetDto;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;

import java.util.List;

public interface TaskEditHistoryService {

    void createRecord(TaskEditHistoryDto taskEditHistoryDto);

    List<TaskEditHistoryGetDto> getEditHistoryByTaskId(Long taskId);
}

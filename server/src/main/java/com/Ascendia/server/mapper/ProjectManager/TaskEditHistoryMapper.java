package com.Ascendia.server.mapper.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;

public class TaskEditHistoryMapper {
    public static TaskEditHistoryDto mapToTaskEditHistoryDto(TaskEditHistory taskEditHistory) {
        return new TaskEditHistoryDto(
                taskEditHistory.getId(),
                taskEditHistory.getTask(),
                taskEditHistory.getUpdatedByName(),
                taskEditHistory.getUpdatedByDesignation(),
                taskEditHistory.getUpdatedByProfilePicUrl(),
                taskEditHistory.getUpdateTime(),
                taskEditHistory.getChangeDescription()
                //ORDER MUST BE THERE AS SAME THE DTO CLASS
        );
    }

    public static TaskEditHistory mapToTaskEditHistory(TaskEditHistoryDto taskEditHistoryDto) {
        return new TaskEditHistory(
                taskEditHistoryDto.getId(),
                taskEditHistoryDto.getTask(),
                taskEditHistoryDto.getUpdatedByName(),
                taskEditHistoryDto.getUpdatedByDesignation(),
                taskEditHistoryDto.getUpdatedByProfilePicUrl(),
                taskEditHistoryDto.getUpdateTime(),
                taskEditHistoryDto.getChangeDescription()
                //ORDER MUST BE THERE AS SAME THE ENTITY CLASS
        );
    }
}

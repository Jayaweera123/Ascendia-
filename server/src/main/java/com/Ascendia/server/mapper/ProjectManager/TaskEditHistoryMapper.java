package com.Ascendia.server.mapper.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryGetDto;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    public static TaskEditHistoryGetDto mapToTaskEditHistoryGetDto(TaskEditHistory taskEditHistory) {
        return new TaskEditHistoryGetDto(
                taskEditHistory.getId(),
                taskEditHistory.getTask().getTaskId(),
                taskEditHistory.getUpdatedByName(),
                taskEditHistory.getUpdatedByDesignation(),
                taskEditHistory.getUpdatedByProfilePicUrl(),
                TaskEditHistoryMapper.convertDateTime(taskEditHistory.getUpdateTime()),
                taskEditHistory.getChangeDescription()
                //ORDER MUST BE THERE AS SAME THE ENTITY CLASS
        );
    }

    public static String convertDateTime(LocalDateTime dateTime) {
        // Define the pattern for the desired output
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d, E yyyy hh.mm a");

        // Format the given LocalDateTime with the specified pattern
        return dateTime.format(formatter);
    }

}

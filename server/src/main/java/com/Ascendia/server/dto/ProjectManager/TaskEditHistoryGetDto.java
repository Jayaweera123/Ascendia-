package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskEditHistoryGetDto {
    private Long id;
    private Long taskId;
    private String updatedByName;
    private String updatedByDesignation;
    private String updatedByProfilePicUrl;
    private String updateTime;
    private String changeDescription;

}


package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskEditHistoryDto {

        private Long id;
        private Task task;
        private String updatedByName;
        private String updatedByDesignation;
        private String updatedByProfilePicUrl;
        private LocalDateTime updateTime;
        private String changeDescription;

}
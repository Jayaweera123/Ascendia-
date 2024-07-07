package com.Ascendia.server.dto.ProjectManager;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskUpdateDto {
    private Long taskId;
    private String taskName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long updatedByUserId;
}

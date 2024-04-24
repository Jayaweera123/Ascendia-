package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.Project.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    private Long taskId;
    private String taskName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Project project;

}

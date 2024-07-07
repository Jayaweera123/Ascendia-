package com.Ascendia.server.dto.SiteManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobGetDto {
    private Long jobId;
    private String jobName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private boolean isDone; // Include the isDone field from the Job entity
    private Long taskId;
}

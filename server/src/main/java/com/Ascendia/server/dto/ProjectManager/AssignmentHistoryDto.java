package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.Administrator.User;
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
public class AssignmentHistoryDto {

    private Long recordId;
    private Project project;
    private User assignedUser;
    private String assignmentType;
    private User assignedByUser;
    private User removedByUser;
    private LocalDate assignmentStartDate;
    private LocalDate assignmentEndDate;
    private Long duration;


}

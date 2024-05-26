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
public class UserProjectAssignmentDto {
    private Long id;
    private Project project;
    private User assignedUser;
    private User assignedByUser;
    private LocalDate assignedDate;
    private String assignmentStatus;
}

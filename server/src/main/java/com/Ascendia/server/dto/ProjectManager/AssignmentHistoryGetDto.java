package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.Administrator.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentHistoryGetDto {
    private Long recordId;
    private String projectName;
    private String assignedUserName;
    private String assignedUserProfilePicUrl;
    private String assignedUserDesignation;
    private String assignedUserDepartment;
    private String assignedByUserName;
    private String assignedByUserProfilePicUrl;
    private String assignedByUserDesignation;
    private String assignedByUserDepartment;
    private String removedByUserName;
    private String removedByUserProfilePicUrl;
    private String removedByUserNameDesignation;
    private String removedByUserDepartment;
    private LocalDate assignmentStartDate;
    private LocalDate assignmentEndDate;
    private String assignmentType;

}

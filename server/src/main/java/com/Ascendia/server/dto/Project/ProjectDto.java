package com.Ascendia.server.dto.Project;

import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.Administrator.User;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long projectId;
    private String projectName;
    private String projectType;
    private String projectDescription;
    private String projectStatus;
    private LocalDate createdDate;
    private LocalDate endDate;
    private User projectManger;
    private String image;

}

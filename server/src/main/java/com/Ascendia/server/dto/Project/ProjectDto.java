package com.Ascendia.server.dto.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    private Long pmId;
    private String image;
}

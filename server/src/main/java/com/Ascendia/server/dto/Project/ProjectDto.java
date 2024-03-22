package com.Ascendia.server.dto.Project;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String pDiscription;
    private String status;
    private LocalDate createdDate;
    private Long pmId;
    private String image;
}

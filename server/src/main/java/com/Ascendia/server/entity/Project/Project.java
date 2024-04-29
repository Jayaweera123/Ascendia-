package com.Ascendia.server.entity.Project;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId; // Change the type to Long or Integer, as per your preference

    @Column(name = "project_name", nullable = false)
    private String projectName; // Updated field name to follow Java naming conventions

    @Column(name = "project_type", nullable = false)
    private String projectType;

    @Column(name = "project_description", nullable = false, length = 1000)
    private String projectDescription;

    @Column(name = "project_status", nullable = false)
    private String projectStatus;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "pm_id")
    private String pmId; // Changed field name to follow Java naming conventions

    @Column(name = "image")
    private String image;

    public Project(String projectName, String projectType, String projectDescription, String projectStatus, LocalDate createdDate, LocalDate endDate, String pmId, String image) {
        this.projectName = projectName;
        this.projectType = projectType;
        this.projectDescription = projectDescription;
        this.projectStatus = projectStatus;
        this.createdDate = createdDate;
        this.endDate = endDate;
        this.pmId = pmId;
        this.image = image;
    }
}

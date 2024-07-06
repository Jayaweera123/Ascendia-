package com.Ascendia.server.entity.Project;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

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

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "project_description", nullable = false, length = 1000)
    private String projectDescription;

    @Column(name = "project_status", nullable = false)
    private String projectStatus;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "pmanager_id", referencedColumnName = "userID")
    private User projectManager;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "userID")
    private User client;

    @ManyToOne
    @JoinColumn(name = "consultant_id", referencedColumnName = "userID")
    private User consultant;

    @Column(name = "progress", nullable = false)
    private double progress; // New field for project progress

    @Column(name = "active", nullable = false)
    private boolean active = true;


    public Project(String projectName, String projectType, String location, String projectDescription, String projectStatus, LocalDate createdDate, LocalDate endDate, String image, User projectManager, double progress) {
        this.projectName = projectName;
        this.projectType = projectType;
        this.location = location;
        this.projectDescription = projectDescription;
        this.projectStatus = projectStatus;
        this.createdDate = createdDate;
        this.endDate = endDate;
        this.image = image;
        this.projectManager = projectManager;
        this.progress = progress;
    }
}

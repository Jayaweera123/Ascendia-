package com.Ascendia.server.entity.ProjectManager;

import com.Ascendia.server.entity.Project.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    @Column(nullable = false, length = 100)
    private String taskName;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private LocalDate createdDate;

    @Column(name = "current_status")
    private String status;

    @Column(name = "previous_status")
    private String prevStatus;

    @Column(nullable = false)
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, referencedColumnName = "projectId")
    private Project project;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaskEditHistory> taskEditHistories = new ArrayList<>();

    public Task(Long taskId, String taskName, String description, LocalDate startDate, LocalDate endDate, LocalDate createdDate, String status, String prevStatus, boolean completed, Project project) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdDate = createdDate;
        this.status = status;
        this.prevStatus = prevStatus;
        this.completed = completed;
        this.project = project;
        this.taskEditHistories = new ArrayList<>();
    }


}
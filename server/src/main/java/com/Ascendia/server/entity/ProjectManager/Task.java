package com.Ascendia.server.entity.ProjectManager;

import com.Ascendia.server.entity.Project.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;

    @Column(name = "task_status")
    @Enumerated(EnumType.STRING)
    private TaskStatus taskStatus;

    @Column(name = "status")
    private String status;


    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, referencedColumnName = "projectId")
    private Project project;

    public enum TaskStatus {
        SCHEDULED,
        IN_PROGRESS,
        COMPLETED,
        OVERDUE
    }


    public TaskStatus calculateStatus() {
        LocalDate currentDate = LocalDate.now();

        if (currentDate.isBefore(startDate)) {
            setStatus("Scheduled");
            return TaskStatus.SCHEDULED;
        } else if (currentDate.isAfter(endDate)) {
            setStatus("Overdue");
            return TaskStatus.OVERDUE;
        } else if (currentDate.isEqual(startDate) || currentDate.isEqual(endDate)) {
            setStatus("In-Progress");
            return TaskStatus.IN_PROGRESS;
        } else {
            setStatus("In-Progress");
            return TaskStatus.IN_PROGRESS;
        }
    }


}

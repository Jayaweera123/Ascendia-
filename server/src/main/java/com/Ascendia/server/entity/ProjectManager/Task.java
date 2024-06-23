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
@Table (name = "task_table")
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
<<<<<<< HEAD

    /*@Column(name = "task_status")
    @Enumerated(EnumType.STRING)
    private TaskStatus taskStatus;*/
=======
>>>>>>> origin/Rashmi_Merge-2.2

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, referencedColumnName = "projectId")
    private Project project;

<<<<<<< HEAD
   /* public enum TaskStatus {
        SCHEDULED,
        IN_PROGRESS,
        COMPLETED,
        OVERDUE
    }*/





}
=======
}
>>>>>>> origin/Rashmi_Merge-2.2

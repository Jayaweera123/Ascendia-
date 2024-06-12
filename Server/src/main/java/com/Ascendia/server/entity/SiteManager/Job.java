package com.Ascendia.server.entity.SiteManager;

import com.Ascendia.server.entity.ProjectManager.Task;
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
@Table (name = "job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;
    @Column(nullable = false, length = 100)
    private String jobName;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;
    @Column(name = "job_status", nullable = false )
    private String status;
    @Column(nullable = false)
    private boolean isDone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id", nullable = false, referencedColumnName = "taskId")
    private Task task;

}
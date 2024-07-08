package com.Ascendia.server.entity.ProjectManager;

import com.Ascendia.server.entity.Administrator.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task_edit_history")
public class TaskEditHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, referencedColumnName = "taskId")
    private Task task;

    @Column(nullable = false, length = 100)
    private String updatedByName;

    @Column(nullable = false, length = 100)
    private String updatedByDesignation;

    @Column
    private String updatedByProfilePicUrl;

    @Column(nullable = false)
    private LocalDateTime updateTime;

    @Column(nullable = false, length = 1000)
    private String changeDescription;
}

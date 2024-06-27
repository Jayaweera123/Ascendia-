package com.Ascendia.server.entity.ProjectManager;


import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import java.time.Period;
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
@Table(name = "user_assign_history")
public class AssignmentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id", nullable = false)
    private User assignedUser;

    @Column(name = "type", nullable = false)
    private String assignmentType; // You can change the type to an enum if there are predefined types
    //I will get the designation of the assigned user at the time.

    @ManyToOne
    @JoinColumn(name = "assigned_by_user_id", nullable = false)
    private User assignedByUser;

    @ManyToOne
    @JoinColumn(name = "removed_by_user_id")
    private User removedByUser; // If an assignment is removed, store the user who removed it

    @Column(name = "assignment_start_date", nullable = false)
    private LocalDate assignmentStartDate;

    @Column(name = "assignment_end_date")
    private LocalDate assignmentEndDate;

}

package com.Ascendia.server.entity.ProjectManager;

import com.Ascendia.server.entity.Administrator.User;
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
@Table(name = "employee_assignment")
public class  UserProjectAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, referencedColumnName = "projectId")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id", nullable = false, referencedColumnName = "userID")
    private User assignedUser;

    @ManyToOne
    @JoinColumn(name = "assigned_by_user_id", nullable = false, referencedColumnName = "userID")
    private User assignedByUser;

    @Column(name = "assignment_date", nullable = false)
    private LocalDate assignedDate;

    @Column(name = "assignment_status", nullable = false)
    private String assignmentStatus;

}

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
    private long projectId;
    @Column(nullable = false)
    private String projectName;
    private String pDiscription;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private LocalDate createdDate;
    @Column(nullable = false)
    private long pmId;
    @Column(nullable = false)
    private String image;
}

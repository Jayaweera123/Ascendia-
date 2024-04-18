package com.Ascendia.server.entity;

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

    @Column(nullable = false)
    private String pTitle; // Updated field name to follow Java naming conventions

    private String pType;

    private String pDescription;

    @Column(nullable = false)
    private String pStatus;

    @Column(nullable = false)
    private LocalDate createdDate;

    private LocalDate endDate;

    @Column(nullable = false)
    private String pmId; // Changed field name to follow Java naming conventions

    private String gmId;

    @Column(nullable = false)
    private String image;

}






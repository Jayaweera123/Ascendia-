package com.Ascendia.server.entity.Project;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="ProjectManager")
public class ProjectManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id", nullable = false,unique = true)
    private Long id;

    @Column(name ="f_name")
    private String firstName;

    @Column(name = "l_name")
    private String LastName;

    @Column(name = "email_id",nullable = false,unique = true)
    private String email;

    @Column(name = "Assign_date")
    private String assignDate;



}

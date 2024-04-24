package com.Ascendia.server.entity.Administrator;

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
@Table(name="User")

public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="userID")
    private Long userID;

    @Column(name="firstName",nullable=false)
    private String firstName;

    @Column(name="lastName",nullable=false)
    private String lastName;

    @Column(name="userName",nullable=false)
    private String userName;

    @Column(name="password",nullable=false, unique = true)
    private String password;

    @Column(name="email",nullable=false, unique = true)
    private String email;

    @Column(name="phoneNumber",nullable=false, unique = true)
    private String phoneNumber;

    @Column(name="addedDate")
    private LocalDate addedDate;

    @Column(name="designation")
    private String designation;

    @Column(name = "is_available", nullable=false)
    private boolean available; // Flag indicating availability

    @Column(name="department")
    private String department;

    @Column(name="profilePhotoURL")
    private String profilePhotoURL;

}

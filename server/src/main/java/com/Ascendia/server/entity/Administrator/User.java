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

    @Column(name="designation", nullable = false)
    private String designation;

    @Column(name="department")
    private String department;

    @Column(name="username",nullable=false)
    private String username;

    @Column(name="password",nullable=false, unique = true)
    private String password;

    @Column(name="email",nullable=false, unique = true)
    private String email;

    @Column(name="phoneNumber",nullable=false, unique = true)
    private String phoneNumber;

    @Column(name="addedDate")
    private LocalDate addedDate;

    @Column(name = "profile_pic_url")
    private String profilePicUrl;

    @Column(name = "availability", nullable = false)
    private boolean availability; // Flag indicating availability

    @Column(name = "active", nullable = false)
    private boolean active;
}
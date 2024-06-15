package com.Ascendia.server.entity.Administrator;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="User")
@Data

public class User implements UserDetails {

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

    @Column(name = "profile_pic_url", nullable = false)
    private String profilePicUrl;

    @Column(name = "availability", nullable = false)
    private boolean availability; // Flag indicating availability

    @Column(name = "active", nullable = false)
    private boolean active;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(designation));
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
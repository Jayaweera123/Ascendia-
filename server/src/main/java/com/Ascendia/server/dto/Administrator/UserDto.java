package com.Ascendia.server.dto.Administrator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userID;
    private String firstName;
    private String lastName;
    private String designation;
    private String department;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private LocalDate addedDate;
    private String profilePicUrl;
    private boolean availability;
    private boolean active;


    // Setter for username (not obtained from frontend)
    public void setUsername(String username) {
        this.username = username;
    }

    // Setter for password (not obtained from frontend)
    public void setPassword(String password) {
        this.password = password;
    }

    // Setter for availability (not obtained from frontend)
    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public void setActive(boolean active) {
        this.active = active;
    }


}
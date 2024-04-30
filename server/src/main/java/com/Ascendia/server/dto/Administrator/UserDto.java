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

    private String profilePicUrl;
    private boolean availability;
    private boolean active;

    private LocalDate addedDate; // Add addedDate field

    // Setter for addedDate
    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    // Setter for userID
    public void setUserID(Long userID) {
        this.userID = userID;
    }

    // Getter for userID
    public Long getUserID() {
        return userID;
    }
}

package com.Ascendia.server.dto.Administrator;

import com.Ascendia.server.entity.Administrator.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
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
    @Setter
    private String username;
    @Setter
    private String password;
    private String email;
    private String phoneNumber;
    private LocalDate addedDate;
    private String profilePicUrl;
    @Setter
    private boolean availability;
    @Setter
    private boolean active;

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private User user;
    private List<User> usersList;
    @Setter
    private List<Long> projectIDs;

}
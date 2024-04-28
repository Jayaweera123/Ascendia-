package com.Ascendia.server.dto.Client;

import com.Ascendia.server.dto.Administrator.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

    private Long reviewID;
    private String reviewTitle;
    private String reviewContent;
    private LocalDate reviewedDate;
    private UserDto user; // Change the type to UserDto



    // Constructors, getters, and setters
}

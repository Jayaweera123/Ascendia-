package com.Ascendia.server.dto.Client;

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

    private String reviewTitle;
    private String reviewContent;
    private LocalDate reviewedDate;

    private String firstName;
    private String lastName;
    private String email;
    private String profilePicUrl;




    public LocalDate getReviewedDate() {
        return reviewedDate;
    }

    public void setReviewedDate(LocalDate reviewedDate) {
        this.reviewedDate = reviewedDate;
    }

}

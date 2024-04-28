package com.Ascendia.server.mapper.Client;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Client.Review;

public class ReviewMapper {
    public static ReviewDto mapToReviewDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewID(review.getReviewID());
        reviewDto.setReviewTitle(review.getReviewTitle());
        reviewDto.setReviewContent(review.getReviewContent());
        reviewDto.setReviewedDate(review.getReviewedDate());

        // Set user information
        if (review.getUser() != null) {
            UserDto userDto = new UserDto();
            userDto.setUserID(review.getUser().getUserID());
            userDto.setFirstName(review.getUser().getFirstName());
            userDto.setLastName(review.getUser().getLastName());
            // Set other properties of UserDto as needed
            reviewDto.setUser(userDto);
        }

        return reviewDto;
    }

    public static Review mapToReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setReviewID(reviewDto.getReviewID());
        review.setReviewTitle(reviewDto.getReviewTitle());
        review.setReviewContent(reviewDto.getReviewContent());
        review.setReviewedDate(reviewDto.getReviewedDate());

        // Assuming you don't map UserDto back to User entity here
        return review;
    }
}

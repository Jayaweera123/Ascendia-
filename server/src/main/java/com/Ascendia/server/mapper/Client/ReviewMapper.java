package com.Ascendia.server.mapper.Client;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.entity.Client.Review;

public class ReviewMapper {

    public static ReviewDto mapToReviewDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();

        reviewDto.setReviewTitle(review.getReviewTitle());
        reviewDto.setReviewContent(review.getReviewContent());
        reviewDto.setReviewedDate(review.getReviewedDate());


        // Set user information if available
        if (review.getUser() != null) {
            reviewDto.setFirstName(review.getUser().getFirstName());
            reviewDto.setLastName(review.getUser().getLastName());
            reviewDto.setEmail(review.getUser().getEmail());
            reviewDto.setProfilePicUrl(review.getUser().getProfilePicUrl());
        }

        return reviewDto;
    }

    public static Review mapToReview(ReviewDto reviewDto) {
        Review review = new Review();

        review.setReviewTitle(reviewDto.getReviewTitle());
        review.setReviewContent(reviewDto.getReviewContent());


        return review;
    }
}

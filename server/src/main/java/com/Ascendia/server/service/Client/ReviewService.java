package com.Ascendia.server.service.Client;


import com.Ascendia.server.dto.Client.ReviewDto;

import java.util.List;


public interface ReviewService {

    ReviewDto addReview(ReviewDto reviewDto);

    ReviewDto getReviewById(Long reviewID);

    List<ReviewDto> getAllReviews();

    //ReviewDto updateReview(Long reviewID, ReviewDto updatedReview);

    //void deleteReview(Long reviewID);

}

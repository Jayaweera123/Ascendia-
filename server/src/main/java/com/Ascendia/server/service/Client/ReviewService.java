package com.Ascendia.server.service.Client;

import com.Ascendia.server.dto.Client.ReviewDto;
import java.util.List;

public interface ReviewService {

    ReviewDto addReview(ReviewDto reviewDto);

    List<ReviewDto> getAllReviews();

}

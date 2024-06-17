package com.Ascendia.server.service.Client.impl;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.entity.Client.Review;
import com.Ascendia.server.mapper.Client.ReviewMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Client.ReviewRepository;
import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Override
    public ReviewDto addReview(ReviewDto reviewDto) {
        // Set reviewed date to current date if not provided
        if (reviewDto.getReviewedDate() == null) {
            reviewDto.setReviewedDate(LocalDate.now());
        }

        Review review = convertToEntity(reviewDto);
        review = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(review);
    }



    @Override
    public List<ReviewDto> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(ReviewMapper::mapToReviewDto)
                .collect(Collectors.toList());
    }


    private Review convertToEntity(ReviewDto reviewDto) {
        Review review = new Review();
        review.setReviewTitle(reviewDto.getReviewTitle());
        review.setReviewContent(reviewDto.getReviewContent());

        // Set reviewed date to current date if not provided
        if (reviewDto.getReviewedDate() == null) {
            review.setReviewedDate(LocalDate.now());
        } else {
            review.setReviewedDate(reviewDto.getReviewedDate());
        }

        review.setUser(userRepository.findByEmail(reviewDto.getEmail()));

        return review;
    }
}

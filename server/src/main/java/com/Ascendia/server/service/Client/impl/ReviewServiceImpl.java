package com.Ascendia.server.service.Client.impl;


import com.Ascendia.server.dto.Client.ReviewDto;

import com.Ascendia.server.entity.Client.Review;
import com.Ascendia.server.exception.Administrator.ResourceNotFoundException;

import com.Ascendia.server.mapper.Client.ReviewMapper;
import com.Ascendia.server.repository.Client.ReviewRepository;

import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;

    @Override
    public ReviewDto addReview(ReviewDto reviewDto) {
        Review review = ReviewMapper.mapToReview(reviewDto);
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(savedReview);
    }

    @Override
    public ReviewDto getReviewById(Long reviewID) {
        Review review = reviewRepository.findById(reviewID)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User is not exists with given Id : "+reviewID));
        return ReviewMapper.mapToReviewDto(review);
    }

    @Override
    public List<ReviewDto> getAllReviews() {
            List<Review> reviews = reviewRepository.findAll();
            return reviews.stream().map((review) -> ReviewMapper.mapToReviewDto(review))
                    .collect(Collectors.toList());
    }


        /*@Override
    public ReviewDto updateReview(Long reviewID, ReviewDto updatedReview) {
        return null;
    }

    @Override
    public void deleteReview(Long reviewID) {

    }*/
}

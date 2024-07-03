package com.Ascendia.server.service.Client.impl;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.entity.Client.Review;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.mapper.Client.ReviewMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Client.ReviewRepository;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Override
    public ReviewDto addReview(ReviewDto reviewDto, Long projectId) {
        // Set reviewed date to current date if not provided
        if (reviewDto.getReviewedDate() == null) {
            reviewDto.setReviewedDate(LocalDate.now());
        }

        Review review = convertToEntity(reviewDto);

        // Fetch project by ID
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isPresent()) {
            review.setProject(projectOptional.get());
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }

        review = reviewRepository.save(review);
        return ReviewMapper.mapToReviewDto(review);
    }

    @Override
    public List<ReviewDto> getAllReviews(List<Long> projectIds) {
        List<Review> reviews = reviewRepository.findAllByProject_ProjectIdIn(projectIds);
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

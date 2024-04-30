package com.Ascendia.server.controller.Client;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    // Build AddReview REST API
    @PostMapping("/add")
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto){
        // Set reviewed date to current date if not provided
        if (reviewDto.getReviewedDate() == null) {
            reviewDto.setReviewedDate(LocalDate.now());
        }

        ReviewDto savedReview = reviewService.addReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // Other endpoints for getting, updating, and deleting reviews can be added here

    // For getAllReviews endpoint
    @GetMapping("/getAll")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        List<ReviewDto> reviewDtos = reviewService.getAllReviews();
        return ResponseEntity.ok(reviewDtos);
    }
}

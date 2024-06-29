package com.Ascendia.server.controller.Client;

import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.service.Administrator.JWTUtils;
import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping
public class ReviewController {
    private final ReviewService reviewService;
    private final JWTUtils jwtUtils;

    // Build AddReview REST API
    @PostMapping("/client/add")
    public ResponseEntity<ReviewDto> addReview(@RequestHeader("Authorization") String token, @RequestBody ReviewDto reviewDto) {
        List<?> rawProjectIds = jwtUtils.extractProjectIDs(token.replace("Bearer ", ""));
        List<Long> projectIds = convertProjectIds(rawProjectIds);

        if (projectIds.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ReviewDto savedReview = reviewService.addReview(reviewDto, projectIds.get(0));
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    // For getAllReviews endpoint
    @GetMapping("/reviews/getAll")
    public ResponseEntity<List<ReviewDto>> getAllReviews(@RequestHeader("Authorization") String token) {
        List<?> rawProjectIds = jwtUtils.extractProjectIDs(token.replace("Bearer ", ""));
        List<Long> projectIds = convertProjectIds(rawProjectIds);

        if (projectIds.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<ReviewDto> reviews = reviewService.getAllReviews(projectIds);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    private List<Long> convertProjectIds(List<?> rawProjectIds) {
        return rawProjectIds.stream()
                .filter(id -> id instanceof Integer || id instanceof Long)
                .map(id -> {
                    if (id instanceof Integer) {
                        return ((Integer) id).longValue();
                    } else {
                        return (Long) id;
                    }
                })
                .collect(Collectors.toList());
    }
}

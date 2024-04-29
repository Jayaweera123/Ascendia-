package com.Ascendia.server.controller.Client;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.dto.Client.ReviewDto;
import com.Ascendia.server.service.Client.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {


    private ReviewService reviewService;
    {/*
    //New DTO to encapsulate ReviewDto and UserDto
    public static class ReviewUserDto {
        private ReviewDto reviewDto;
        private UserDto userDto;

        // Getters and setters
        // You can generate these using your IDE or manually
        public ReviewDto getReviewDto() {
            return reviewDto;
        }

        public void setReviewDto(ReviewDto reviewDto) {
            this.reviewDto = reviewDto;
        }

        public UserDto getUserDto() {
            return userDto;
        }

        public void setUserDto(UserDto userDto) {
            this.userDto = userDto;
        }
    }
    */}


    //Build AddReview REST API
    @PostMapping("/create")
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto){
        ReviewDto savedReview = reviewService.addReview(reviewDto);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }



    @GetMapping("{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable("id") Long reviewID){
        ReviewDto reviewDto = reviewService.getReviewById(reviewID);
        return ResponseEntity.ok(reviewDto);
    }


    @GetMapping
    public ResponseEntity<List<ReviewDto>>  getAllReviews() {
        List<ReviewDto> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }
}

package com.Ascendia.server.entity.Client;

import com.Ascendia.server.entity.Administrator.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Review")

public class Review {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="reviewID")
    private Long reviewID;

    @Column(name="reviewTitle", nullable=false)
    private String reviewTitle;

    @Column(name="reviewContent", nullable=false)
    private String reviewContent;

    @Column(name="reviewedDate")
    private LocalDate reviewedDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    private User user;



}

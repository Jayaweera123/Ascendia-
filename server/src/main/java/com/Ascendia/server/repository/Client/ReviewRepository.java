package com.Ascendia.server.repository.Client;

import com.Ascendia.server.entity.Client.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByProject_ProjectIdIn(List<Long> projectIds);
}
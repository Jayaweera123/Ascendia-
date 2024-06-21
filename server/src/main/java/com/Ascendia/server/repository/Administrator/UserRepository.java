package com.Ascendia.server.repository.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    Optional<User> findByUsername(String username);

    List<User> findByAvailabilityTrue();

    List<User> findAllByLastLoginDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    int countByActiveTrue();

    int countByActiveFalse();

    // Fetch users who were active within a certain time window
    List<User> findByLastActiveTimeGreaterThanEqual(LocalDateTime activeThreshold);
}












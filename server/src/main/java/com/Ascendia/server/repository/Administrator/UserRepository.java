package com.Ascendia.server.repository.Administrator;

import com.Ascendia.server.dto.Administrator.UserDto;
import com.Ascendia.server.entity.Administrator.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    List<User> findByOnlineStatusTrue();

    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);

    //Nethuni
    @Query("SELECT u FROM User u WHERE u.availability = true AND u.designation IN (:designations)")
    List<User> findByAvailabilityTrueAndDesignations(@Param("designations") List<String> designations);
    
}












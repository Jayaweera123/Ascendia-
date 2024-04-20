package com.Ascendia.server.repository.Admin;

import com.Ascendia.server.entity.Admin.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByAvailableTrue();

    //Now, whenever you need to assign a user to a project, you can query
    // the UserRepository to fetch a list of available users and proceed with the assignment.
    //List<User> availableUsers = userRepository.findByAvailableTrue();
}
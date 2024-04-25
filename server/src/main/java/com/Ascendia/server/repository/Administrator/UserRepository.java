package com.Ascendia.server.repository.Administrator;

import com.Ascendia.server.entity.Administrator.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}










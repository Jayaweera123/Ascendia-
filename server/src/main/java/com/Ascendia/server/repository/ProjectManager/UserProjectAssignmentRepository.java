package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectAssignmentRepository extends JpaRepository<UserProjectAssignment, Long> {
}

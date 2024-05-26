package com.Ascendia.server.repository.ProjectManager;

import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.Store.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
    List<Task> findByProjectProjectId(Long projectId);

    @Query(
            "SELECT t FROM Task t WHERE " +
                    "t.project.projectId = :projectId AND " +
                    "(t.taskName LIKE CONCAT('%',:query, '%') OR " +
                    "t.description LIKE CONCAT('%',:query, '%'))")
    List<Task> searchTask(Long projectId, String query);


}

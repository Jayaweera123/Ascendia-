package com.Ascendia.server.repository.SiteManager;

import com.Ascendia.server.entity.SiteManager.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTaskTaskId(Long taskId);

    int countJobsByTask_TaskId(Long taskId);
}

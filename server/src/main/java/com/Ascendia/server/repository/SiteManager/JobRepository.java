package com.Ascendia.server.repository.SiteManager;

import com.Ascendia.server.entity.SiteManager.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTaskTaskId(Long taskId);

    int countJobsByTask_TaskId(Long taskId);

    @Query("SELECT CASE WHEN COUNT(j) > 0 THEN false ELSE true END FROM Job j WHERE j.task.taskId = :taskId AND j.isDone = false")
    boolean areAllJobsCompletedForTask(@Param("taskId") Long taskId);
}

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


    @Query("SELECT COUNT(j) FROM Job j WHERE j.task.taskId = :taskId AND j.status = 'Completed'")
    int countJobsByTask_TaskIdAndStatusCompleted(@Param("taskId") Long taskId);

    @Query(
            "SELECT t FROM Job t WHERE " +
                    "t.task.taskId = :taskId AND " +
                    "(t.jobName LIKE CONCAT('%',:query, '%') OR " +
                    "t.description LIKE CONCAT('%',:query, '%'))")
    List<Job> searchJob(Long taskId, String query);

    @Query("SELECT COUNT(j) FROM Job j JOIN j.task t JOIN t.project p WHERE p.projectId = :projectId")
    Long countJobsByProjectId(@Param("projectId") Long projectId);

    @Query("SELECT COUNT(j) FROM Job j JOIN j.task t JOIN t.project p WHERE p.projectId = :projectId AND j.status = 'Completed'")
    Long countCompletedJobsByProjectId(@Param("projectId") Long projectId);



}

package com.Ascendia.server.entity.SiteManager;

import com.Ascendia.server.entity.Administrator.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "job_comment")
public class CommentJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentJobId")
    private Long commentJobId;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false, referencedColumnName = "jobId")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "commentor_user_id", nullable = false, referencedColumnName = "userID")
    private User commentedJobUser;

    @Column(name = "commentText", length = 500)
    private String commentJobText;

    @Column(name = "commentDateTime")
    private LocalDateTime commentJobDate;

}

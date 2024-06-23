package com.Ascendia.server.entity.SiteManager;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.ProjectManager.Task;
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
@Table(name = "task_comment_table")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentId")
    private int commentId;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false, referencedColumnName = "taskId")
    private Task task;

    //@Column(name = "taskName")
    //private String taskName;

    @ManyToOne
    @JoinColumn(name = "commentor_user_id", nullable = false, referencedColumnName = "userID")
    private User commentedUser;

    @Column(name = "commentText", length = 500)
    private String commentText;

    //@Column(name = "commentDate")
    //private String commentDate;

    @Column(name = "commentDateTime")
    private LocalDateTime commentDate;

}
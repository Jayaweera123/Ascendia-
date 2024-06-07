package com.Ascendia.server.entity.SiteEngineer;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "commentTable")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentId")
    private int commentId;
    @Column(name = "taskId")
    private int taskId;
    @Column(name = "taskName")
    private String taskName;
    @Column(name = "userId")
    private int userId;
    @Column(name = "commentText")
    private String commentText;
    @Column(name = "commentDate")
    private String commentDate;

}

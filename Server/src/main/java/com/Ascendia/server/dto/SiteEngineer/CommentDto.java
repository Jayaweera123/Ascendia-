package com.Ascendia.server.dto.SiteEngineer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private int commentId;
    private int taskId;
    private String taskName;
    private int userId;
    private String commentText;
    private String commentDate;
}

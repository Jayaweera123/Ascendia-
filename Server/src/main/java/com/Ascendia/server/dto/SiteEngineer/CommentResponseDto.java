package com.Ascendia.server.dto.SiteEngineer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
    private int commentId;
    private Long taskId;
    private String taskName;
    private String commentedUserName;
    private String designation;
    private String profilePicUrl;
    private String commentText;
    private String commentDateTime;
}
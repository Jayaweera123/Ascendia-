package com.Ascendia.server.dto.SiteManager;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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
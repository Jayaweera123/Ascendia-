package com.Ascendia.server.dto.SiteManager;

import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.SiteManager.Job;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentJobDto {
    private Long commentJobId;
    private Job job;
    private User commentedJobUser;
    private String commentJobText;
    private LocalDateTime commentJobDate;
}
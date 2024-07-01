package com.Ascendia.server.dto.SiteManager;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseJobDto {
    private Long commentJobId;
    private Long JobId;
    private String JobName;
    private String commentedJobUserName;
    private String designationJob;
    private String profilePicUrlJob;
    private String commentJobText;
    private String commentJobDateTime;
}
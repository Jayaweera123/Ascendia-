package com.Ascendia.server.dto.SiteEngineer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobDto {

    private int jobId;
    private String jobName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}

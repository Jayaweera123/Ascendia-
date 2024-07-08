package com.Ascendia.server.dto.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskProgressDto {
    private Long taskId;
    private String taskName;
    private int progress;
}

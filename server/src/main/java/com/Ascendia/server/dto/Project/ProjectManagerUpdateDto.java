
package com.Ascendia.server.dto.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectManagerUpdateDto {
    private Long projectId;
    private Long projectManagerId;
}
package com.Ascendia.server.dto.ProjectManager;

import com.Ascendia.server.entity.Project.Project;
<<<<<<< HEAD
=======
import com.Ascendia.server.entity.ProjectManager.Task;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
>>>>>>> origin/Rashmi_Merge-2.2
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    private Long taskId;
    private String taskName;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    //private Task.TaskStatus taskStatus;
    private LocalDate createdDate;
    private String status;
    private String prevStatus;
    private boolean completed;
    private Project project;

<<<<<<< HEAD

    // Method to calculate and set status based on start and end dates
   /* public void calculateAndSetStatus() {
        LocalDate currentDate = LocalDate.now();
        if (currentDate.isBefore(startDate)) {
            setStatus("Scheduled");
        } else if (currentDate.isAfter(endDate)) {
            setStatus("Completed");
        } else {
            setStatus("In Progress");
        }
    }*/

}
=======
}
>>>>>>> origin/Rashmi_Merge-2.2

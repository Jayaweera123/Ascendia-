package com.Ascendia.server.controller.ProjectManager;

import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryGetDto;
import com.Ascendia.server.service.ProjectManager.TaskEditHistoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/pmanageronly")
public class TaskEditHistoryController {

    private final TaskEditHistoryService taskEditHistoryService;

    @GetMapping("/task/{taskId}/edit-history")
    public List<TaskEditHistoryGetDto> getEditHistoryByTaskId(@PathVariable Long taskId) {
        return taskEditHistoryService.getEditHistoryByTaskId(taskId);
    }
}

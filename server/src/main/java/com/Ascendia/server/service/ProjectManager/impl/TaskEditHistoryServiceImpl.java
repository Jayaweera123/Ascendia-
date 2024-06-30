package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskUpdateDto;
import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;
import com.Ascendia.server.mapper.ProjectManager.AssignmentHistoryMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskEditHistoryMapper;
import com.Ascendia.server.repository.ProjectManager.TaskEditHistoryRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.service.ProjectManager.TaskEditHistoryService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class TaskEditHistoryServiceImpl implements TaskEditHistoryService {

    @Autowired
    private TaskEditHistoryRepository taskEditHistoryRepository;


    @Override
    public void createRecord(TaskEditHistoryDto taskEditHistoryDto) {
        TaskEditHistory taskEditHistory = TaskEditHistoryMapper.mapToTaskEditHistory(taskEditHistoryDto);
        taskEditHistoryRepository.save(taskEditHistory);
    }



/*
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskEditHistoryRepository taskEditHistoryRepository;*/

    /*
        StringBuilder changeDescription = new StringBuilder();
        if (!task.getTaskName().equals(newTaskName)) {
            changeDescription.append("Task name changed to ").append(newTaskName).append(". ");
            task.setTaskName(newTaskName);
        }
        if (!task.getDescription().equals(newDescription)) {
            changeDescription.append("Description changed. ");
            task.setDescription(newDescription);
        }
        if (!task.getStartDate().equals(newStartDate)) {
            changeDescription.append("Start date changed to ").append(newStartDate).append(". ");
            task.setStartDate(newStartDate);
        }
        if (!task.getEndDate().equals(newEndDate)) {
            changeDescription.append("End date changed to ").append(newEndDate).append(". ");
            task.setEndDate(newEndDate);
        }
        if (!task.getStatus().equals(newStatus)) {
            changeDescription.append("Status changed to ").append(newStatus).append(". ");
            task.setStatus(newStatus);
        }
        if (task.isCompleted() != newCompleted) {
            changeDescription.append("Completed status changed to ").append(newCompleted).append(". ");
            task.setCompleted(newCompleted);
        }

        // Save the task
        task = taskRepository.save(task);

        // Save the edit history
        TaskEditHistory editHistory = new TaskEditHistory();
        editHistory.setTask(task);
        editHistory.setUpdatedBy(updatedBy);
        editHistory.setUpdateTime(LocalDateTime.now());
        editHistory.setChangeDescription(changeDescription.toString());
        taskEditHistoryRepository.save(editHistory);*/


}

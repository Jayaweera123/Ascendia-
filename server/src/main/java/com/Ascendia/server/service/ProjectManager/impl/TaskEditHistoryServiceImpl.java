package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskEditHistoryGetDto;
import com.Ascendia.server.dto.ProjectManager.TaskUpdateDto;
import com.Ascendia.server.dto.SiteManager.JobGetDto;
import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.TaskEditHistory;
import com.Ascendia.server.entity.SiteManager.Job;
import com.Ascendia.server.mapper.ProjectManager.AssignmentHistoryMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskEditHistoryMapper;
import com.Ascendia.server.mapper.SiteManager.JobMapper;
import com.Ascendia.server.repository.ProjectManager.TaskEditHistoryRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.service.ProjectManager.TaskEditHistoryService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<TaskEditHistoryGetDto> getEditHistoryByTaskId(Long taskId) {
        List<TaskEditHistory> records = taskEditHistoryRepository.findByTaskTaskId(taskId);
        return records.stream()
                .map(TaskEditHistoryMapper::mapToTaskEditHistoryGetDto)
                .collect(Collectors.toList());
    }



}

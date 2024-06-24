package com.Ascendia.server.service.ProjectManager.impl;

import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryGetDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.AssignmentHistoryMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.mapper.ProjectManager.UserProjectAssignmentMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.AssignmentHistoryRepository;
import com.Ascendia.server.service.ProjectManager.AssignmentHistoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AssignmentHistoryServiceImpl implements AssignmentHistoryService {

    private AssignmentHistoryRepository assignmentHistoryRepository;
    private ProjectRepository projectRepository;
    private UserRepository userRepository;



    @Override
    public AssignmentHistoryDto createHistoryRecord(AssignmentHistoryDto assignmentHistoryDto) {

        // Retrieve project details from the database based on projectId
        Project project = projectRepository.findById(assignmentHistoryDto.getProject().getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + assignmentHistoryDto.getProject().getProjectId()));

        // Retrieve user details from the database based on userId (for Assignee)
        User assignedUser = userRepository.findById(assignmentHistoryDto.getAssignedUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignmentHistoryDto.getAssignedUser().getUserID()));


        // Retrieve user details from the database based on userId(Assigned by:)
        User assignedByUser = userRepository.findById(assignmentHistoryDto.getAssignedByUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignmentHistoryDto.getAssignedByUser().getUserID()));

        // Retrieve user details from the database based on userId(Removed by :)
        User removedByUser = userRepository.findById(assignmentHistoryDto.getRemovedByUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignmentHistoryDto.getRemovedByUser().getUserID()));


        //mapping
        AssignmentHistory historyRecord = AssignmentHistoryMapper.mapToAssignmentHistory(assignmentHistoryDto);
        historyRecord.setAssignmentEndDate(LocalDate.now());
        historyRecord.setProject(project);
        historyRecord.setAssignedUser(assignedUser);
        historyRecord.setAssignedByUser(assignedByUser);
        historyRecord.setRemovedByUser(removedByUser);

        //saving
        AssignmentHistory savedRecord = assignmentHistoryRepository.save(historyRecord);
        return AssignmentHistoryMapper.mapToAssignmentHistoryDto(savedRecord);

    }

    @Override
    public List<AssignmentHistoryGetDto> getRecordsByProjectId(Long projectId) {
        List<AssignmentHistory> records = assignmentHistoryRepository.findByProjectProjectId(projectId);
        return records.stream().map(AssignmentHistoryMapper::mapToAssignmentHistoryGetDto).collect(Collectors.toList());
    }

    @Override
    public AssignmentHistoryGetDto getRecordById(Long Id) {
        AssignmentHistory record = assignmentHistoryRepository.findById(Id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with the given ID : "+Id));
        return AssignmentHistoryMapper.mapToAssignmentHistoryGetDto(record);

    }

    @Override
    public String calculateDuration(AssignmentHistoryGetDto assignmentHistoryDto) {
        LocalDate startDate = assignmentHistoryDto.getAssignmentStartDate();
        LocalDate endDate = assignmentHistoryDto.getAssignmentEndDate();

        Period period = Period.between(startDate, endDate);

        int years = period.getYears();
        int months = period.getMonths();
        int days = period.getDays();

        StringBuilder result = new StringBuilder();

        if (years > 0) {
            result.append(years).append(" year");
            if (years > 1) {
                result.append("s");
            }
        }

        if (months > 0) {
            if (result.length() > 0) {
                result.append(", ");
            }
            result.append(months).append(" month");
            if (months > 1) {
                result.append("s");
            }
        }

        if (days > 0) {
            if (result.length() > 0) {
                result.append(", ");
            }
            result.append(days).append(" day");
            if (days > 1) {
                result.append("s");
            }
        }

        // Handle case when the period is zero (e.g., same day)
        if (result.length() == 0) {
            result.append("0 days");
        }

        return result.toString();
    }

    @Override
    public List<AssignmentHistoryGetDto> searchRecord(Long projectId, String query) {
        List<AssignmentHistory> records = assignmentHistoryRepository.searchRecord(projectId, query);
        return records.stream().map(AssignmentHistoryMapper::mapToAssignmentHistoryGetDto)
                .collect(Collectors.toList());
    }

}


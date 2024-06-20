package com.Ascendia.server.service.ProjectManager.impl;


import com.Ascendia.server.dto.ProjectManager.AssignmentHistoryDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.ProjectManager.UserProjectAssignmentDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.AssignmentHistory;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.entity.ProjectManager.UserProjectAssignment;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.mapper.ProjectManager.UserProjectAssignmentMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.UserProjectAssignmentRepository;
import com.Ascendia.server.service.ProjectManager.AssignmentHistoryService;
import com.Ascendia.server.service.ProjectManager.UserProjectAssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserProjectAssignmentServiceImpl implements UserProjectAssignmentService {

    private UserProjectAssignmentRepository userProjectAssignmentRepository;

    private final AssignmentHistoryService assignmentHistoryService;

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;



    @Override
    public UserProjectAssignmentDto addAssignment(UserProjectAssignmentDto assignmentDto) {

        // Retrieve project details from the database based on projectId
        Project project = projectRepository.findById(assignmentDto.getProject().getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with ID: " + assignmentDto.getProject().getProjectId()));

        // Retrieve user details from the database based on userId (for Assignee)
        User assignedUser = userRepository.findById(assignmentDto.getAssignedUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignmentDto.getAssignedUser().getUserID()));

        // Check if the user is available
        if (!assignedUser.isAvailability()) {
            throw new ResourceNotFoundException("User with ID " + assignedUser.getUserID() + " is not available for assignment.");
        }

        // Retrieve user details from the database based on userId(Assigned by :)
        User assignedByUser = userRepository.findById(assignmentDto.getAssignedByUser().getUserID())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + assignmentDto.getAssignedByUser().getUserID()));


        // Set user availability to false
        assignedUser.setAvailability(false);

        // Map DTO to entity
        UserProjectAssignment assignment = UserProjectAssignmentMapper.mapToUserProjectAssignment(assignmentDto);
        assignment.setAssignedDate(LocalDate.now());
        assignment.setProject(project);
        assignment.setAssignedUser(assignedUser);
        assignment.setAssignedByUser(assignedByUser);

        // Save assignment
        UserProjectAssignment savedAssignment = userProjectAssignmentRepository.save(assignment);

        return UserProjectAssignmentMapper.mapToUserProjectAssignmentDto(savedAssignment);
/*
        // Retrieve project details from the database based on projectId
        Optional<Project> projectOptional = projectRepository.findById(assignmentDto.getProject().getProjectId());

        //assignmentDto.setProject(projectOptional.get());

        // Retrieve user details from the database based on userId
        Optional<User> addedUser = userRepository.findById(assignmentDto.getAssignedUser().getUserID());
        Optional<User> addedByUser = userRepository.findById(assignmentDto.getAssignedByUser().getUserID());

        //User addedUser0 = addedUser.get();


        // Set user availability to false
        addedUser.get().setAvailability(false);

        assignmentDto.setProject(projectOptional.get());
        assignmentDto.setAssignedUser(addedUser.get());
        assignmentDto.setAssignedByUser(addedByUser.get());



        UserProjectAssignment assignment = UserProjectAssignmentMapper.mapToUserProjectAssignment(assignmentDto);
        assignment.setAssignedDate(LocalDate.now()); // set the createdDate here
        UserProjectAssignment savedAssignment = userProjectAssignmentRepository.save(assignment);

        return UserProjectAssignmentMapper.mapToUserProjectAssignmentDto(savedAssignment);*/



    }

    @Override
    public List<Project> getProjectsByAssignedUser(User assignedUser) {
        return userProjectAssignmentRepository.findProjectsByAssignedUser(assignedUser);
    }

    @Override
    public List<UserProjectAssignmentDto> getAssignsByProjectId(Long projectId) {
        List<UserProjectAssignment> assignments = userProjectAssignmentRepository.findByProjectProjectId(projectId);
        if (assignments.isEmpty()) {
            throw new ResourceNotFoundException("No assignments found for project with ID " + projectId);
        }
        return assignments.stream().map(UserProjectAssignmentMapper::mapToUserProjectAssignmentDto).collect(Collectors.toList());
    }

    @Override
    public void deleteAssignmentById(Long assignmentId) {
        UserProjectAssignment assignment = userProjectAssignmentRepository.findById(assignmentId).orElseThrow(
                () -> new ResourceNotFoundException("Assignment does not in exists with given id : " + assignmentId)
        );


        // Retrieve the assigned user
        User assignedUser = assignment.getAssignedUser();

        // Set availability to true
        assignedUser.setAvailability(true);

        // Save the updated user
        userRepository.save(assignedUser);

        //Save the record in history
        AssignmentHistoryDto removalRecord = new AssignmentHistoryDto();
        removalRecord.setProject(assignment.getProject());
        removalRecord.setAssignedUser(assignment.getAssignedUser());
        removalRecord.setAssignmentType(assignment.getAssignedUser().getDesignation());
        removalRecord.setAssignedByUser(assignment.getAssignedByUser());
        removalRecord.setRemovedByUser(assignment.getAssignedByUser()); //This should come from the front end
        removalRecord.setAssignmentStartDate(assignment.getAssignedDate());

        assignmentHistoryService.createHistoryRecord(removalRecord);


        // Delete the assignment
        userProjectAssignmentRepository.deleteById(assignmentId);
    }

    @Override
    public void deleteAssignmentsByProjectId(Long projectId) {
        // Retrieve all assignments for the given project ID
        List<UserProjectAssignment> assignments = userProjectAssignmentRepository.findByProjectProjectId(projectId);

        // Check if any assignments are found
        if (assignments.isEmpty()) {
            throw new ResourceNotFoundException("No assignments found for project with ID " + projectId);
        }

        try {
            // Iterate over each assignment and delete it
            for (UserProjectAssignment assignment : assignments) {
                // Retrieve the assigned user
                User assignedUser = assignment.getAssignedUser();
                // Set availability to true
                assignedUser.setAvailability(true);
                // Save the updated user
                userRepository.save(assignedUser);
                // Delete the assignment
                userProjectAssignmentRepository.deleteById(assignment.getId());
            }
        } catch (Exception e) {
            // Log the error or handle it according to your application's requirements
            throw new RuntimeException("Failed to delete assignments for project with ID: " + projectId, e);
        }
    }

    @Override
    public List<UserProjectAssignmentDto> searchAssignment(Long projectId, String query) {
        List<UserProjectAssignment> assignments =  userProjectAssignmentRepository.searchAssignment(projectId, query);
        return assignments.stream().map(UserProjectAssignmentMapper::mapToUserProjectAssignmentDto)
                .collect(Collectors.toList());
    }







}

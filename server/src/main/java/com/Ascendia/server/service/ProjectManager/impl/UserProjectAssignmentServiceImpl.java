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
import com.Ascendia.server.service.ProjectManager.SendEmailService;
import com.Ascendia.server.service.ProjectManager.UserProjectAssignmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProjectAssignmentServiceImpl implements UserProjectAssignmentService {

    private final UserProjectAssignmentRepository userProjectAssignmentRepository;
    private final AssignmentHistoryService assignmentHistoryService;
    private final SendEmailService sendEmailService;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserProjectAssignmentServiceImpl(
            UserProjectAssignmentRepository userProjectAssignmentRepository,
            AssignmentHistoryService assignmentHistoryService,
            @Qualifier("projectManagerSendEmailServiceImpl") SendEmailService sendEmailService,
            ProjectRepository projectRepository,
            UserRepository userRepository) {
        this.userProjectAssignmentRepository = userProjectAssignmentRepository;
        this.assignmentHistoryService = assignmentHistoryService;
        this.sendEmailService = sendEmailService;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }



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

        //Send email notification
        String subject = "Project Assignment Notification";

        String body =

                "Dear " + assignedUser.getFirstName() + " " + assignedUser.getLastName() + ",\n\n" +
                        "You have been assigned to a new project as a " + assignedUser.getDesignation() + ".\n\n" +
                        "Project: " + project.getProjectName() + "\n" +
                        "Assigned By: " + assignedByUser.getFirstName() + " " + assignedByUser.getLastName() + " ("+assignedByUser.getDesignation()+")\n\n" +
                        "We are excited to have you on board and look forward to your contributions to the project. Please review the project details and get ready to dive in.\n\n" +
                        "Best regards,\n" +
                        "Ascendia Construction Management\n" +
                        "\n";



        sendEmailService.sendEmail(assignedUser.getEmail(), body, subject);

        return UserProjectAssignmentMapper.mapToUserProjectAssignmentDto(savedAssignment);

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

        //Send Email

        String subject = "Removal From the Project Notification";

        String body =
                "Dear " + assignedUser.getFirstName() + " " + assignedUser.getLastName() + ",\n\n" +
                       "We want to express our sincere gratitude for your contributions to the project as a " + assignedUser.getDesignation() + ".\n\n" +
                        "Project: " + assignment.getProject().getProjectName() + "\n" +
                        "Removed By: " + assignment.getAssignedByUser().getFirstName() + " " + assignment.getAssignedByUser().getLastName() + " (" + assignment.getAssignedByUser().getDesignation() + ")\n\n" +
                        "Your dedication and efforts have been greatly appreciated. Although you are no longer assigned to this project, we value the contributions you made and the expertise you brought to our team.\n\n" +
                        "Should you have any questions or need further assistance, please do not hesitate to contact us.\n\n" +
                        "Best regards,\n" +
                        "Ascendia Construction Management\n" +
                        "\n";

        sendEmailService.sendEmail(assignedUser.getEmail(), body, subject);


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

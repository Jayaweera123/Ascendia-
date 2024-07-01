package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.PmDto;
import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.service.Project.SendEmailService;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.exception.Administrator.ResourceNotFoundException;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.mapper.Project.ProjectGetMapper;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.ProjectManager.UserProjectAssignmentRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.Project.ProjectService;
import com.Ascendia.server.service.ProjectManager.TaskService;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserProjectAssignmentRepository userProjectAssignmentRepository;
    private final SendEmailService sendEmailService;
    private final JobRepository jobRepository;
    private final TaskService taskService;// Path to the directory where profile images will be stored
    private final UserRepository userRepository;
    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository,
                              UserProjectAssignmentRepository userProjectAssignmentRepository,
                              @Qualifier("projectCreationTeamSendEmailServiceImpl") SendEmailService sendEmailService,
                              JobRepository jobRepository,
                              TaskService taskService,
                              UserRepository userRepository,
                              @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.projectRepository = projectRepository;
        this.userProjectAssignmentRepository = userProjectAssignmentRepository;
        this.sendEmailService = sendEmailService;
        this.jobRepository = jobRepository;
        this.taskService = taskService;
        this.userRepository = userRepository;
        this.uploadDir = uploadDir;
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage, String clientFirstName, String clientLastName, String consultantFirstName, String consultantLastName) {
        // Check if a profile image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                // Get the file name
                String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
                // Set the file path where the image will be stored
                Path uploadPath = Paths.get(uploadDir + fileName);
                // Copy the file to the upload path
                Files.copy(profileImage.getInputStream(), uploadPath);
                // Set the profile picture URL in the DTO
                projectDto.setImage(uploadPath.toString());
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception appropriately
            }
        }
        Project project = ProjectMapper.mapProject(projectDto);
        project.setCreatedDate(LocalDate.now());

        Optional<User> clientOpt = userRepository.findByFirstNameAndLastName(clientFirstName, clientLastName);
        if (clientOpt.isPresent()) {
            project.setClient(clientOpt.get());
        } else {
            throw new RuntimeException("Client not found");
        }

        Optional<User> consultantOpt = userRepository.findByFirstNameAndLastName(consultantFirstName, consultantLastName);
        if (consultantOpt.isPresent()) {
            project.setConsultant(consultantOpt.get());
        } else {
            throw new RuntimeException("Consultant not found");
        }

        Project savedProject = projectRepository.save(project);

        if (savedProject.getProjectManager() != null) {
            User projectManager = savedProject.getProjectManager();
            String subject = "Project Manager Assignment Notification";

            String body = String.format(
                    "Dear %s %s,<br><br>" +
                            "You have been assigned as the Project Manager for the project:<br>" +
                            "<strong>Project:</strong> %s<br><br>" +
                            "Please review the project details and get ready to lead the team.<br><br>" +
                            "Best regards,<br><br>" +
                            "Ascendia Construction Management",
                    projectManager.getFirstName(), projectManager.getLastName(), savedProject.getProjectName()
            );

            sendEmailService.sendEmail(projectManager.getEmail(), body, subject);
        }

        return ProjectMapper.mapToProjectDto(savedProject);
    }

    @Override
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map((project) -> ProjectMapper.mapToProjectDto(project))
                .collect(Collectors.toList());

    }

    public void deactivateProjectById(Long projectId) {
        try {
            Project project = projectRepository.findByProjectId(projectId);
            if (project != null) {
                project.setActive(false);
                projectRepository.save(project);
            } else {
                throw new IllegalArgumentException("Project with ID " + projectId + " not found");
            }
        } catch (MalformedJwtException e) {
            throw new SecurityException("Invalid JWT token", e);
        }
    }


    @Override
    public ProjectDto updateProjectById(Long projectId, ProjectDto projectDto, MultipartFile profileImage,
                                        String newClientFirstName, String newClientLastName,
                                        String newConsultantFirstName, String newConsultantLastName) {

        Project existingProject = projectRepository.findByProjectId(projectId);

        if (projectDto.getProjectType() != null) {
            existingProject.setProjectType(projectDto.getProjectType());
        }
        if (projectDto.getProjectDescription() != null) {
            existingProject.setProjectDescription(projectDto.getProjectDescription());
        }
        if (projectDto.getProjectStatus() != null) {
            existingProject.setProjectStatus(projectDto.getProjectStatus());
        }
        if (projectDto.getCreatedDate() != null) {
            existingProject.setCreatedDate(projectDto.getCreatedDate());
        }
        if (projectDto.getEndDate() != null) {
            existingProject.setEndDate(projectDto.getEndDate());
        }
        if (projectDto.getImage() != null) {
            existingProject.setImage(projectDto.getImage());
        }

        // Check if a profile image is provided
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                // Get the file name
                String fileName = StringUtils.cleanPath(profileImage.getOriginalFilename());
                // Set the file path where the image will be stored
                Path uploadPath = Paths.get(uploadDir + fileName);
                // Copy the file to the upload path
                Files.copy(profileImage.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
                // Set the image URL in the project entity
                existingProject.setImage(uploadPath.toString());
            } catch (IOException e) {
                e.printStackTrace(); // Handle the exception appropriately
            }
        }

        // Update client information if provided
        if (newClientFirstName != null && newClientLastName != null) {
            Optional<User> clientOpt = userRepository.findByFirstNameAndLastName(newClientFirstName, newClientLastName);
            if (clientOpt.isPresent()) {
                existingProject.setClient(clientOpt.get());
            } else {
                throw new RuntimeException("Client not found");
            }
        }

        // Update consultant information if provided
        if (newConsultantFirstName != null && newConsultantLastName != null) {
            Optional<User> consultantOpt = userRepository.findByFirstNameAndLastName(newConsultantFirstName, newConsultantLastName);
            if (consultantOpt.isPresent()) {
                existingProject.setConsultant(consultantOpt.get());
            } else {
                throw new RuntimeException("Consultant not found");
            }
        }

        // Save the updated project entity
        Project updatedProject = projectRepository.save(existingProject);

        // Map the updated project entity back to DTO and return
        return ProjectMapper.mapToProjectDto(updatedProject);
    }


    @Override
    public ProjectGetDto getProjectByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with the given ID : " + projectId));

        ProjectGetDto projectGetDto = ProjectGetMapper.mapToProjectGetDto(project);

        // Calculate project progress
        double progress = taskService.calculateProjectProgress(projectId);
        projectGetDto.setProgress(progress);

        return projectGetDto;
    }

    @Override
    public ProjectDto getProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with the given ID : " + projectId));
        return ProjectMapper.mapToProjectDto(project);
    }

    @Override
    public List<ProjectGetDto> getProjectsByPmId(Long pmId) {
        User projectManager = userRepository.findById(pmId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid project manager ID: " + pmId));
        //return projectRepository.findProjectsByProjectManager(projectManager);

        List<Project> projects = projectRepository.findProjectsByProjectManager(projectManager);
        return projects.stream().map(ProjectGetMapper::mapToProjectGetDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectGetDto> getProjectsForUser(User user) {
        List<Project> projects = new ArrayList<>();

        if (user.getAuthorities().contains(new SimpleGrantedAuthority("Project Creation Team"))) {
            projects = projectRepository.findAll();

        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Project Manager"))) {
            projects = projectRepository.findByProjectManager(user);

        } else {
            projects = userProjectAssignmentRepository.findProjectsByAssignedUser(user);
        }

        return projects.stream().map(ProjectGetMapper::mapToProjectGetDto).collect(Collectors.toList());
    }

    @Override
    public Long getTotalJobsForProject(Long projectId) {
        return jobRepository.countJobsByProjectId(projectId);
    }

    @Override
    public Long getCompletedJobsCountForProject(Long projectId) {
        return jobRepository.countCompletedJobsByProjectId(projectId);
    }

    @Override
    public Long getEmployeeCountForProject(Long projectId) {
        return userProjectAssignmentRepository.countDistinctAssignedUsersByProjectId(projectId);
    }

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public int getTaskCountForProject(Long projectId) {
        return taskRepository.countTasksByProject_ProjectId(projectId);
    }



    @Override
    public String updatePM(Long projectId, PmDto pmDto) {
        //retrieve project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with the given ID : " + projectId));


        // Retrieve user details from the database based on userId(Assigned by :)
        User projectManager = userRepository.findById(pmDto.getProjectManagerId())
                .orElseThrow(() -> new ResourceNotFoundException("Project Manager not found with ID: " +pmDto.getProjectManagerId()));

        //User projectManager = pmDto.getProjectManager();

        if (projectManager != null) {

            project.setProjectManager(projectManager);

            // Save the updated project entity
            Project UpdatedProject = projectRepository.save(project);

            return "Prject manger is updated "+ projectManager.getFirstName() + " " + projectManager.getLastName();

        } else {
            // Handle the null case appropriately
            // For example, log an error, throw an exception, or provide a default value
            throw new NullPointerException("Project Manager is null in PmDto");
        }

    }

    @Override
    public Long countCompletedProjects() {
        return projectRepository.countCompletedProjects();
    }

    @Override
    public Long countInProgressProjects() {
        return projectRepository.countInProgressProjects();
    }

    @Override
    public Long countCancelledProjects() {
        return projectRepository.countCancelledProjects();
    }

    @Override
    public Long countPendingProjects() {
        return projectRepository.countPendingProjects();
    }
}

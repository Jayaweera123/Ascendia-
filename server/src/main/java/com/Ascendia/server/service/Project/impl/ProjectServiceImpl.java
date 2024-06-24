package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    private  UserProjectAssignmentRepository userProjectAssignmentRepository;
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private TaskService taskService;// Path to the directory where profile images will be stored
    @Autowired
    private UserRepository userRepository;
    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.projectRepository = projectRepository;
        this.uploadDir = uploadDir;
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
    public ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage) {
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
        project.setCreatedDate(LocalDate.now()); // set the createdDate here
        Project savedProject = projectRepository.save(project);

        return ProjectMapper.mapToProjectDto(savedProject);
    }

    @Override
    public List<ProjectGetDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map((project) -> ProjectGetMapper.mapToProjectGetDto(project))
                .collect(Collectors.toList());

    }

    public void deleteProjectById(Long projectId) {
        Project project = projectRepository.findByProjectId(projectId);
        if (project != null) {
            projectRepository.delete(project);
        } else {
            // Handle case where project with given name doesn't exist
            throw new IllegalArgumentException("Project with name " + projectId + " not found");
        }
    }
    @Override
    public ProjectDto updateProjectById(Long projectId, ProjectDto projectDto) {
        Project existingProject = projectRepository.findByProjectId(projectId);
        if (existingProject != null) {
            // Update the fields of existing project entity with the values from DTO
            existingProject.setProjectType(projectDto.getProjectType());
            existingProject.setProjectDescription(projectDto.getProjectDescription());
            existingProject.setProjectStatus(projectDto.getProjectStatus());
            existingProject.setCreatedDate(projectDto.getCreatedDate());
            existingProject.setEndDate(projectDto.getEndDate());
            //existingProject.setPmId(projectDto.getPmId());
            existingProject.setImage(projectDto.getImage());

            // Save the updated project entity
            Project updatedProject = projectRepository.save(existingProject);

            // Map the updated project entity back to DTO and return
            return ProjectMapper.mapToProjectDto(updatedProject);
        } else {
            // Handle case where project with given name doesn't exist
            throw new IllegalArgumentException("Project with name " + projectId + " not found");
        }
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

}

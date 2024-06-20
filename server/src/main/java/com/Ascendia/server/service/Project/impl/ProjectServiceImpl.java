package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.exception.Administrator.ResourceNotFoundException;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.mapper.Project.ProjectGetMapper;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.ProjectManager.UserProjectAssignmentRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.Project.ProjectService;
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
    private JobRepository jobRepository;
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
            projects = projectRepository.findAll(); // Return all projects for Project Creation Team
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Project Manager"))) {
            projects = projectRepository.findByProjectManager(user);
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Store Keeper"))) {
            projects = projectRepository.findByStoreKeeper(user);
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Site Engineer"))) {
            projects = projectRepository.findBySiteEngineer(user);
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Supervisor"))) {
            projects = projectRepository.findBySupervisor(user);
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Technical Officer"))) {
            projects = projectRepository.findByTechnicalOfficer(user);
        } else if (user.getAuthorities().contains(new SimpleGrantedAuthority("Quantity Surveyor"))) {
            projects = projectRepository.findByQuantitySurveyor(user);
        }

        return projects.stream().map(this::mapToProjectDto).collect(Collectors.toList());
    }

    private ProjectGetDto mapToProjectDto(Project project) {
        ProjectGetDto projectDto = new ProjectGetDto();
        projectDto.setProjectId(project.getProjectId());
        projectDto.setProjectName(project.getProjectName());
        projectDto.setProjectType(project.getProjectType());
        projectDto.setProjectDescription(project.getProjectDescription());
        projectDto.setProjectStatus(project.getProjectStatus());
        projectDto.setCreatedDate(project.getCreatedDate());
        projectDto.setEndDate(project.getEndDate());
        projectDto.setPmId(project.getProjectManager() != null ? project.getProjectManager().getUserID().toString() : null);
        projectDto.setImage(project.getImage());

        return projectDto;
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
            existingProject.setPmId(projectDto.getPmId());
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
    public ProjectDto getProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Project not found with the given ID : " + projectId));
        return ProjectMapper.mapToProjectDto(project);
    }

    @Override
    public List<ProjectDto> getProjectsByPmId(String pmId) {

        List<Project> projects = projectRepository.findByPmId(pmId);
        return projects.stream().map((project) -> ProjectMapper.mapToProjectDto(project))
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDto> searchProject(String pmId, String query) {
        List<Project> projects =  projectRepository.searchProject(pmId, query);
        return projects.stream().map(ProjectMapper::mapToProjectDto)
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

    @Autowired
    private UserProjectAssignmentRepository userProjectAssignmentRepository;

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




    /*@Override
    public String calculateDuration(ProjectDto projectDto) {
        return null;

        LocalDate startDate = projectDto.getCreatedDate();
        LocalDate endDate = projectDto.getEndDate();

        Period period;
        period = Period.between(startDate, endDate);

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
            if (!result.isEmpty()) {
                result.append(", ");
            }
            result.append(months).append(" month");
            if (months > 1) {
                result.append("s");
            }
        }

        if (days > 0) {
            if (!result.isEmpty()) {
                result.append(", ");
            }
            result.append(days).append(" day");
            if (days > 1) {
                result.append("s");
            }
        }

        // Handle case when the period is zero (e.g., same day)
        if (result.isEmpty()) {
            result.append("0 days");
        }

        return result.toString();
    }*/


}

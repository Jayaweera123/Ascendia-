package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.mapper.Project.ProjectGetMapper;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.service.Project.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

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
    private final String uploadDir; // Path to the directory where profile images will be stored

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, @Value("${user.profile.image.upload-dir}") String uploadDir) {
        this.projectRepository = projectRepository;
        this.uploadDir = uploadDir;
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
        return null;
    }

    @Override
    public List<ProjectDto> getProjectsByPmId(Long pmId) {
        return null;
    }

    @Override
    public List<ProjectDto> searchProject(Long pmId, String query) {
        return null;
    }

    @Override
    public String calculateDuration(ProjectDto projectDto) {
        return null;
    }

    @Override
    public Long getTotalJobsForProject(Long projectId) {
        return null;
    }

    @Override
    public Long getCompletedJobsCountForProject(Long projectId) {
        return null;
    }

    @Override
    public Long getEmployeeCountForProject(Long projectId) {
        return null;
    }

    @Override
    public int getTaskCountForProject(Long projectId) {
        return 0;
    }
}

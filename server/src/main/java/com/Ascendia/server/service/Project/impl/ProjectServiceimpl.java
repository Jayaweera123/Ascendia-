package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.entity.Project.Project;
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
    public List<ProjectDto> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream().map((project) -> ProjectMapper.mapToProjectDto(project))
                .collect(Collectors.toList());

    }
}

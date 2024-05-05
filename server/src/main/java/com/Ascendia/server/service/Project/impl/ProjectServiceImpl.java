package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
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
}
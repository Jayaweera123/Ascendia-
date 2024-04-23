package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.service.Project.ProjectService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional
public class ProjectServiceimpl implements ProjectService{
    private ProjectRepository projectRepository;
    @Override
    public ProjectDto createProject(ProjectDto projectDto) {

        Project project = ProjectMapper.mapProject(projectDto);
        Project savedProject =  projectRepository.save(project);
        return ProjectMapper.mapToProjectDto(savedProject);
    }
}

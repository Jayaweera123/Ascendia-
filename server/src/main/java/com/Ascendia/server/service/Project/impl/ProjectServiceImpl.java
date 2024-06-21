package com.Ascendia.server.service.Project.impl;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import com.Ascendia.server.entity.ProjectManager.Task;
import com.Ascendia.server.exceptions.ResourceNotFoundException;
import com.Ascendia.server.mapper.Project.ProjectMapper;
import com.Ascendia.server.mapper.ProjectManager.TaskMapper;
import com.Ascendia.server.repository.Administrator.UserRepository;
import com.Ascendia.server.repository.Project.ProjectRepository;
import com.Ascendia.server.repository.ProjectManager.TaskRepository;
import com.Ascendia.server.repository.ProjectManager.UserProjectAssignmentRepository;
import com.Ascendia.server.repository.SiteManager.JobRepository;
import com.Ascendia.server.service.Project.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;




    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = ProjectMapper.mapToProject(projectDto);
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
    public List<ProjectDto> getProjectsByPmId(Long pmId) {

            User projectManager = userRepository.findById(pmId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid project manager ID: " + pmId));
            //return projectRepository.findProjectsByProjectManager(projectManager);

        List<Project> projects = projectRepository.findProjectsByProjectManager(projectManager);
        return projects.stream().map(ProjectMapper::mapToProjectDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectDto> searchProject(Long pmId, String query) {
        List<Project> projects =  projectRepository.searchProject(pmId, query);
        return projects.stream().map(ProjectMapper::mapToProjectDto)
                .collect(Collectors.toList());
    }

    public Long getTotalJobsForProject(Long projectId) {
        return jobRepository.countJobsByProjectId(projectId);
    }

    public Long getCompletedJobsCountForProject(Long projectId) {
        return jobRepository.countCompletedJobsByProjectId(projectId);
    }

    @Override
    public String calculateDuration(ProjectDto projectDto) {

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
    }

    @Autowired
    private UserProjectAssignmentRepository userProjectAssignmentRepository;

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
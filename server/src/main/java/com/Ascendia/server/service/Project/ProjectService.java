package com.Ascendia.server.service.Project;

import com.Ascendia.server.dto.Project.ProjectDto;
import com.Ascendia.server.dto.ProjectManager.TaskDto;
import com.Ascendia.server.dto.Project.ProjectGetDto;
import com.Ascendia.server.entity.Administrator.User;
import com.Ascendia.server.entity.Project.Project;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {

    List<ProjectGetDto> getProjectsForUser(User user);

    ProjectDto createProject(ProjectDto projectDto, MultipartFile profileImage);

    List<ProjectGetDto> getAllProjects();

    void deleteProjectById(Long projectId);

    ProjectDto updateProjectById(Long projectId, ProjectDto projectDto);

    //Nethuni
    ProjectDto getProjectId(Long projectId);

    //List<ProjectDto> getProjectsByPmId(String pmId);


    //List<ProjectDto> searchProject(String pmId, String query);

    //String calculateDuration(ProjectDto projectDto);

    Long getTotalJobsForProject(Long projectId);

    Long getCompletedJobsCountForProject(Long projectId);

    Long getEmployeeCountForProject(Long projectId);

    int getTaskCountForProject(Long projectId);



}

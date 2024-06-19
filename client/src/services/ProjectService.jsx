import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const getAllProjectCards = () => axios.get(REST_API_BASE_URL+ "/project/all");

export const getProjectById = (projectId) =>
  axios.get("http://localhost:8080/pmanager/" + projectId);

{/*Nethuni*/}

export const getProjectForPM = (ProjectManagerId) =>
  axios.get("http://localhost:8080/pmanager/pm/" + ProjectManagerId);

export const searchProject = (pmId, searchTerm) =>
  axios.get(
    "http://localhost:8080/pmanager/search/" + pmId + "?query=" + searchTerm
  );

export const getProjectDuration = (projectId) =>
  axios.get("http://localhost:8080/pmanager/duration/" + projectId);

export const getJobCount = (projectId) =>
  axios.get("http://localhost:8080/pmanager/" + projectId + "/jobs/count");

export const getCompletedJobCount = (projectId) =>
  axios.get(
    "http://localhost:8080/pmanager/" + projectId + "/completed/jobs/count"
  );

export const getEmployeeCount = (projectId) =>
  axios.get(
    "http://localhost:8080/pmanager/" + projectId + "/employees/count"
  );

export const getTaskCount = (projectId) =>
  axios.get("http://localhost:8080/pmanager/" + projectId + "/task/count");

/** AUTHENTICATION CHECKER */
class AuthService {
  // Check if the user is authenticated by verifying if token exists in localStorage
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  }

  // Check if the user's designation allows access to pcteam-related functionalities
  static isProject() {
    const designation = localStorage.getItem('designation');
    const allowedDesignations = [
      'Project Creation Team'
    ];
    return allowedDesignations.includes(designation);
  }

  // Check if the user is authenticated and has a designation allowing pcteam-related functionalities
  static projectOnly() {
    return this.isAuthenticated() && this.isProject();
  }
}
export default AuthService;

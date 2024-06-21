import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create an instance of axios with JWT token included in the headers
const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects", error);
    throw error;
  }
};

export const getAllProjectCards = () => axiosInstance.get("/project/all");

export const getProjectById = (projectId) => axiosInstance.get(`/pmanager/${projectId}`);

export const getProjectForPM = (ProjectManagerId) => axiosInstance.get(`/pmanager/pm/${ProjectManagerId}`);

export const searchProject = (pmId, searchTerm) => axiosInstance.get(`/pmanager/search/${pmId}?query=${searchTerm}`);

export const getProjectDuration = (projectId) => axiosInstance.get(`/pmanager/duration/${projectId}`);

export const getJobCount = (projectId) => axiosInstance.get(`/pmanager/${projectId}/jobs/count`);

export const getCompletedJobCount = (projectId) => axiosInstance.get(`/pmanager/${projectId}/completed/jobs/count`);

export const getEmployeeCount = (projectId) => axiosInstance.get(`/pmanager/${projectId}/employees/count`);

export const getTaskCount = (projectId) => axiosInstance.get(`/pmanager/${projectId}/task/count`);

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

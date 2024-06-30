import axios from "axios";

// Helper function to get the token
const getToken = () => localStorage.getItem("token");

// Create an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Token added to request headers:", token);
    } else {
      console.warn("No token found in localStorage");
    }
    console.log("Request headers:", config.headers); // Log headers to verify token presence
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const REST_API_BASE_URL = "http://localhost:8080"; // Ensure this is defined

export const getAllProjectCards = () =>
  api.get(REST_API_BASE_URL + "/project/all");

export const deleteProjectById = (projectId) =>
  api.delete(`${REST_API_BASE_URL}/project/${projectId}`);

{
  /*Nethuni*/
}
export const getProjectById = (projectId) =>
  api.get("http://localhost:8080/pmanager/" + projectId);

export const getProjectByProjectManagerId = () =>
  api.get("http://localhost:8080/projects/user");

export const getProjectForPM = (ProjectManagerId) =>
  api.get("http://localhost:8080/pmanager/" + ProjectManagerId + "/all");

export const searchProject = (pmId, searchTerm) =>
  api.get(
    "http://localhost:8080/pmanager/search/" + pmId + "?query=" + searchTerm
  );

export const getProjectDuration = (projectId) =>
  api.get("http://localhost:8080/pmanager/duration/" + projectId);

export const getJobCount = (projectId) =>
  api.get("http://localhost:8080/pmanager/" + projectId + "/jobs/count");

export const getCompletedJobCount = (projectId) =>
  api.get(
    "http://localhost:8080/pmanager/" + projectId + "/completed/jobs/count"
  );

export const getEmployeeCount = (projectId) =>
  api.get("http://localhost:8080/pmanager/" + projectId + "/employees/count");

export const getTaskCount = (projectId) =>
  api.get("http://localhost:8080/pmanager/" + projectId + "/task/count");

/** AUTHENTICATION CHECKER */
class AuthService {
  // Check if the user is authenticated by verifying if token exists in localStorage
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, otherwise false
  }

  // Check if the user's designation allows access to pcteam-related functionalities
  static isProject() {
    const designation = localStorage.getItem("designation");
    const allowedDesignations = ["Project Creation Team"];
    return allowedDesignations.includes(designation);
  }

  // Check if the user is authenticated and has a designation allowing pcteam-related functionalities
  static projectOnly() {
    return this.isAuthenticated() && this.isProject();
  }
}

export default AuthService;

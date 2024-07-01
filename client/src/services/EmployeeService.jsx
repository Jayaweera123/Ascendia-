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
    }
    console.log("Request headers:", config.headers); // Log headers to verify token presence
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const REST_API_BASE_URL = "http://localhost:8080"; // Ensure this is defined

export const getAllProjectCards = () => api.get("/project/all");

const REST_API_BASE_URL0 = "/api/users/";

export const getAllAvailableUsers = () => api.get("/pmanager/available/all");

const REST_API_BASE_URL1 = "/pmanager/user/";

export const addAssignment = (assignment) => api.post(REST_API_BASE_URL1 + "add", assignment);

export const deleteAssignment = (assignmentId) => api.delete(REST_API_BASE_URL1 + "remove/" + assignmentId);

export const getAllEmployeesForProject = (projectId) => api.get(REST_API_BASE_URL1 + projectId + "/all");

export const searchAssignment = (projectId, query) => api.get(REST_API_BASE_URL1 + "search/" + projectId + "?query=" + query);

const REST_API_BASE_URL2 = "/pmanager/history/";

export const getAllPreviousEmployees = (projectId) => api.get(REST_API_BASE_URL2 + projectId + "/records");

export const getDurationForEmployee = (recordId) => api.get(REST_API_BASE_URL2 + recordId + "/duration");

export const searchHistory = (projectId, query) => api.get(REST_API_BASE_URL2 + "search/" + projectId + "?query=" + query);

export const getAllAvailableProjectManagers = () => api.get("/project/available/allprojectmanagers");

export const removeAllEmployees = (projectId) =>
  api.delete(REST_API_BASE_URL1 + projectId + "/remove/all");

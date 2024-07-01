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
    console.log(config.headers); // Log headers to verify token presence
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const REST_API_BASE_URL = "http://localhost:8080";

const REST_API_BASE_URL0 = "http://localhost:8080/pmanager/task/";

export const getTasksForProject = (ProjectId) =>
  api.get("http://localhost:8080/sengineer/" + ProjectId + "/tasks");

export const createTask = (task) =>
  api.post("http://localhost:8080/sengineer/task/add", task);

export const getTask = (taskId) =>
  api.get("http://localhost:8080/sengineer/task/" + taskId);

export const updateTask = (taskId, task) =>
  api.put("http://localhost:8080/sengineer/" + taskId + "/edit", task);

export const deleteTask = (taskId) =>
  api.delete("http://localhost:8080/pmanageronly/task/" + taskId);

//axios.get(REST_API_BASE_URL0 + "api/project/" + ProjectId + "/tasks");

export const getJobCountForTask = (taskId) =>
  api.get("http://localhost:8080/pmanager/" + taskId + "/jobcount");

export const getCompletedJobCountForTask = (taskId) =>
  api.get("http://localhost:8080/pmanager/" + taskId + "/job/completed");

export const setStatusLabel = (taskId) =>
  api.put("http://localhost:8080/sengineer/" + taskId + "/status");

export const searchTask = (projectId, query) =>
  api.get(
    "http://localhost:8080/pmanager/search/task/" +
      projectId +
      "?query=" +
      query
  );

export const getTimeBetween = (taskId) =>
  api.get("http://localhost:8080/pmanager/" + taskId + "/due-days");

export const markAsCompleted = (taskId) =>
  api.get("http://localhost:8080/sengineer/" + taskId + "/mark-as-done");

export const markAsUncompleted = (taskId) =>
  api.get("http://localhost:8080/pmanageronly/" + taskId + "/mark-as-undone");

//==========comments==================

const REST_API_BASE_URL1 = "";

export const getCommetsForTask = (taskId) =>
  api.get("http://localhost:8080/sengineer/comment/task/" + taskId);

export const getCommentsForJob = (JobId) =>
  api.get("http://localhost:8080/sengineer/comment/job/" + JobId);

/** AUTHENTICATION CHECKER */
class AuthService {
  // Check if the user is authenticated by verifying if token exists in localStorage
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, otherwise false
  }

  // Check if the user's designation allows access to pmanager-related functionalities
  static isPmanager() {
    const designation = localStorage.getItem("designation");
    const allowedDesignations = ["Project Manager", "Project Creation Team"];
    return allowedDesignations.includes(designation);
  }

  // Check if the user is authenticated and has a designation allowing pmanager-related functionalities
  static pmanagerOnly() {
    return this.isAuthenticated() && this.isPmanager();
  }

  static isPmanageronly() {
    const designation = localStorage.getItem("designation");
    const allowedDesignations = ["Project Manager"];
    return allowedDesignations.includes(designation);
  }

  static pmanageronlyOnly() {
    return this.isAuthenticated() && this.isPmanageronly();
  }
}

export default AuthService;

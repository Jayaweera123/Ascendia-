import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080";

export const getAllTaskCards = () => axios.get(REST_API_BASE_URL + "/pmanager/task/all");

const REST_API_BASE_URL0 = "http://localhost:8080/pmanager/task/";

export const createTask = (task) =>
  axios.post(REST_API_BASE_URL0 + "add", task);

export const getTask = (taskId) => axios.get(REST_API_BASE_URL0 + taskId);

export const updateTask = (taskId, task) =>
  axios.put(REST_API_BASE_URL0 + taskId + "/edit", task);

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL0 + taskId);

export const getTasksForProject = (ProjectId) =>
  axios.get(REST_API_BASE_URL0 + "/api/project/" + ProjectId + "/tasks");


/** AUTHENTICATION CHECKER */
class AuthService {
  // Check if the user is authenticated by verifying if token exists in localStorage
  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, otherwise false
  }

  // Check if the user's designation allows access to pmanager-related functionalities
  static isPmanager() {
    const designation = localStorage.getItem('designation');
    const allowedDesignations = [
      'Project Manager',
      'Project Creation Team'
    ];
    return allowedDesignations.includes(designation);
  }

  // Check if the user is authenticated and has a designation allowing pmanager-related functionalities
  static pmanagerOnly() {
    return this.isAuthenticated() && this.isPmanager();
  }

  static isPmanageronly() {
      const designation = localStorage.getItem('designation');
      const allowedDesignations = [
        'Project Manager'
      ];
      return allowedDesignations.includes(designation);
    }
  
    static pmanageronlyOnly() {
      return this.isAuthenticated() && this.isPmanageronly();
    }
}

export default AuthService;

  axios.get(REST_API_BASE_URL0 + "api/project/" + ProjectId + "/tasks");

export const getJobCountForTask = (taskId) =>
  axios.get(REST_API_BASE_URL0 + taskId + "/jobcount");

export const getCompletedJobCountForTask = (taskId) =>
  axios.get(REST_API_BASE_URL0 + taskId + "/jobcount/completed");

export const setStatusLabel = (taskId) =>
  axios.put(REST_API_BASE_URL0 + taskId + "/set-status");

export const searchTask = (projectId, query) =>
  axios.get(REST_API_BASE_URL0 + "search/" + projectId + "?query=" + query);

export const getTimeBetween = (taskId) =>
  axios.get(REST_API_BASE_URL0 + taskId + "/time-difference");

export const markAsCompleted = (taskId) =>
  axios.get(REST_API_BASE_URL0 + taskId + "/mark-as-done");

export const markAsUncompleted = (taskId) =>
  axios.get(REST_API_BASE_URL0 + taskId + "/mark-as-undone");

//==========comments==================

const REST_API_BASE_URL1 = "http://localhost:8080/api/v2/comment/";

export const getCommetsForTask = (taskId) =>
  axios.get(REST_API_BASE_URL1 + "task/" + taskId);

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/task/all";

export const getAllTaskCards = () => axios.get(REST_API_BASE_URL);

const REST_API_BASE_URL0 = "http://localhost:8080/api/task/";

export const createTask = (task) =>
  axios.post(REST_API_BASE_URL0 + "add", task);

export const getTask = (taskId) => axios.get(REST_API_BASE_URL0 + taskId);

export const updateTask = (taskId, task) =>
  axios.put(REST_API_BASE_URL0 + taskId + "/edit", task);

export const deleteTask = (taskId) => axios.delete(REST_API_BASE_URL0 + taskId);

export const getTasksForProject = (ProjectId) =>
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

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/task/all";

export const getAllTaskCards = () => axios.get(REST_API_BASE_URL);

const REST_API_BASE_URL0 = "http://localhost:8080/api/task";

export const createTask = (task) => axios.post(REST_API_BASE_URL0, task);

export const getTask = (taskId) => axios.get(REST_API_BASE_URL0 + "/" + taskId);

export const updateTask = (taskId, task) =>
  axios.put(REST_API_BASE_URL0 + "/" + taskId, task);

export const deleteTask = (taskId) =>
  axios.delete(REST_API_BASE_URL0 + "/" + taskId);

export const getTasksForProject = (ProjectId) =>
  axios.get(REST_API_BASE_URL0 + "/api/project/" + ProjectId + "/tasks");

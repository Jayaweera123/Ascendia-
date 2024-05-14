import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/project/all";

export const getProjectById = (projectId) =>
  axios.get("http://localhost:8080/api/project/" + projectId);

{
  /*Nethuni*/
}

export const getAllProjectCards = () => axios.get(REST_API_BASE_URL);

export const getAllEmploeesForProject = (projectId) =>
  axios.get("http://localhost:8080/api/project/user/" + projectId + "/all");

export const getProjectForPM = (ProjectManagerId) =>
  axios.get("http://localhost:8080/api/project/pm/" + ProjectManagerId);

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/project/all";

export const getProjectById = (projectId) =>
  axios.get("http://localhost:8080/api/project/" + projectId);

{
  /*Nethuni*/
}

export const getAllProjectCards = () => axios.get(REST_API_BASE_URL);

export const getProjectForPM = (ProjectManagerId) =>
  axios.get("http://localhost:8080/api/project/pm/" + ProjectManagerId);

export const searchProject = (pmId, searchTerm) =>
  axios.get(
    "http://localhost:8080/api/project/search/" + pmId + "?query=" + searchTerm
  );

export const getProjectDuration = (projectId) =>
  axios.get("http://localhost:8080/api/project/duration/" + projectId);

export const getJobCount = (projectId) =>
  axios.get("http://localhost:8080/api/project/" + projectId + "/jobs/count");

export const getEmployeeCount = (projectId) =>
  axios.get(
    "http://localhost:8080/api/project/" + projectId + "/employees/count"
  );

export const getTaskCount = (projectId) =>
  axios.get("http://localhost:8080/api/project/" + projectId + "/task/count");

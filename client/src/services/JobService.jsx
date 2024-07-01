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

const REST_API_BASE_URL0 = "http://localhost:8080";
{
  /*const REST_API_BASE_URL0 = "http://localhost:8080/api/job/"; */
}

export const getJobsForTask = (taskId) =>
  api.get("http://localhost:8080/senginner/task/" + taskId + "/jobs");

export const searchJobs = (taskId, query) =>
  api.get(
    "http://localhost:8080/senginner/search/" + taskId + "?query=" + query
  );

export const getJobById = (jobId) =>
  api.get("http://localhost:8080/senginner/job/" + jobId);

export const updateStatusOfJob = (jobId) =>
  api.put(REST_API_BASE_URL0 + "updateStatus/" + jobId);

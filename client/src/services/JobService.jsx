import axios from "axios";

const REST_API_BASE_URL0 = "http://localhost:8080";
{/*const REST_API_BASE_URL0 = "http://localhost:8080/api/job/"; */}

export const getJobsForTask = (taskId) =>
  axios.get(REST_API_BASE_URL0 + "api/task/" + taskId + "/jobs");

export const searchJobs = (taskId, query) =>
  axios.get(REST_API_BASE_URL0 + "search/" + taskId + "?query=" + query);

export const updateStatusOfJob = (jobId) =>
  axios.put(REST_API_BASE_URL0 + "updateStatus/" + jobId);

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080"; 

// Helper function to get the token
const getToken = () => localStorage.getItem("token");

// Create an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data", // Set content type for multipart/form-data
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


export const createProject = (formData) => api.post("/project/createProject", formData);

export const updateProjectById = async (projectId, formData) => {
  if (!projectId || !formData) throw new Error("Invalid project data or projectId");

  try {
    const response = await api.put(`/project/update/${projectId}`, formData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error('API call failed:', error);
  throw error; // or handle error as needed
};

export const getAllProjectCards = () => api.get(REST_API_BASE_URL + "/project/all");

export const deactivateProjectById = (projectId) => api.delete(`/project/${projectId}`);

export const countCompletedProjects = () => api.get("/project/count/completed");
export const countInProgressProjects = () => api.get("/project/count/inprogress");
export const countPendingProjects = () => api.get("/project/count/pending");
export const countCancelledProjects = () => api.get("/project/count/cancelled");

// Fetch project counts by year
export const fetchProjectCountsByYear = () => {
  return Promise.all([
    api.get("/project/count/completed/byYear"),
    api.get("/project/count/inProgress/byYear"),
    api.get("/project/count/cancelled/byYear"),
    api.get("/project/count/pending/byYear")
  ]).then((responses) => {
    return {
      completed: responses[0].data,
      inProgress: responses[1].data,
      cancelled: responses[2].data,
      pending: responses[3].data
    };
  });
};

{
  /*Nethuni*/
}

export const getProjectById = (projectId) =>
  api.get("http://localhost:8080/pmanager/" + projectId);


export const getProjectByProjectManagerId = () => api.get("/projects/user");

export const getProjectForPM = (ProjectManagerId) => api.get(`/pmanager/${ProjectManagerId}/all`);

export const searchProject = (pmId, searchTerm) => api.get(`/pmanager/search/${pmId}?query=${searchTerm}`);

export const getProjectDuration = (projectId) => api.get(`/pmanager/duration/${projectId}`);

export const getJobCount = (projectId) => api.get(`/pmanager/${projectId}/jobs/count`);

export const getCompletedJobCount = (projectId) => api.get(`/pmanager/${projectId}/completed/jobs/count`);

export const getEmployeeCount = (projectId) => api.get(`/pmanager/${projectId}/employees/count`);

export const getTaskCount = (projectId) => api.get(`/pmanager/${projectId}/task/count`);

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

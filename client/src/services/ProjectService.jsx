import axios from 'axios';

export class ProjectService {
    static BASE_URL = "http://localhost:8080";

    static async getAllProjectCards(token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/project/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching all ProjectCards:", err);
            throw err;
        }
    }

    static async getProjectById(projectId, token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/pmanager/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            console.error(`Error fetching Project with ID ${projectId}:`, err);
            throw err;
        }
    }
}

export class AuthService {
    // Check if the user is authenticated by verifying if token exists in localStorage
    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token; // Returns true if token exists, otherwise false
    }

    // Check if the user's designation allows access to pcteam-related functionalities
    static isProject() {
        const designation = localStorage.getItem('designation');
        const allowedDesignations = ['Project Creation Team'];
        return allowedDesignations.includes(designation);
    }

    // Check if the user is authenticated and has a designation allowing pcteam-related functionalities
    static projectOnly() {
        return this.isAuthenticated() && this.isProject();
    }
}

export const getProjectForPM = (ProjectManagerId) =>
    axios.get(`http://localhost:8080/pmanager/pm/${ProjectManagerId}`);

export const searchProject = (pmId, searchTerm) =>
    axios.get(`http://localhost:8080/pmanager/search/${pmId}?query=${searchTerm}`);

export const getProjectDuration = (projectId) =>
    axios.get(`http://localhost:8080/pmanager/duration/${projectId}`);

export const getJobCount = (projectId) =>
    axios.get(`http://localhost:8080/pmanager/${projectId}/jobs/count`);

export const getCompletedJobCount = (projectId) =>
    axios.get(`http://localhost:8080/pmanager/${projectId}/completed/jobs/count`);

export const getEmployeeCount = (projectId) =>
    axios.get(`http://localhost:8080/pmanager/${projectId}/employees/count`);

export const getTaskCount = (projectId) =>
    axios.get(`http://localhost:8080/pmanager/${projectId}/task/count`);

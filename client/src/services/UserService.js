import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/users';

// Function to fetch the list of users {http://localhost:8080/api/users}
export const userList = () => axios.get(REST_API_BASE_URL + '/getAll');

// Function to add a new user {http://localhost:8080/api/users/create}
export const addUser = (user, profileImage) => {
    const formData = new FormData(); // Create a new FormData object to store form data
    formData.append('profileImage', profileImage); // Append profileImage to the formData object
    // Iterate over the keys of the user object
    Object.keys(user).forEach(key => {
        formData.append(key, user[key]); // Append each key-value pair of the user object to the formData object
    });
    // Send a POST request to the server to add the user
    return axios.post(REST_API_BASE_URL + '/add', formData, {
        // Set headers for the request to handle multipart form data
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}; 

// Function to get a specific user by ID {http://localhost:8080/api/users/{userID}}
export const getUser = (userID) => axios.get(`${REST_API_BASE_URL}/${userID}`);

// Function to edit/update an existing user {http://localhost:8080/api/users/{userID}}
export const editUser = (userID, user) => axios.put(`${REST_API_BASE_URL}/${userID}`, user);

// Function to deactivate a user by ID {http://localhost:8080/api/users/{userID}}
export const deactivateUser = (userID) => axios.delete(`${REST_API_BASE_URL}/${userID}`);

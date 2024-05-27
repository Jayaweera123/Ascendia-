import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/users';

// Function to fetch the list of users {http://localhost:8080/api/users/getAll}
export const userList = () => {
    return axios.get(`${REST_API_BASE_URL}/getAll`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching user list:", error);
            throw error;
        });
};

// Function to add a new user {http://localhost:8080/api/users/add}
export const addUser = (user, profileImage) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    Object.keys(user).forEach(key => {
        formData.append(key, user[key]);
    });

    return axios.post(`${REST_API_BASE_URL}/add`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error adding user:", error);
        throw error;
    });
};

// Function to get a specific user by ID {http://localhost:8080/api/users/{userID}}
export const getUser = (userID) => {
    return axios.get(`${REST_API_BASE_URL}/${userID}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error fetching user with ID ${userID}:`, error);
            throw error;
        });
};

// Function to edit/update an existing user {http://localhost:8080/api/users/{userID}}
export const editUser = (userID, user) => {
    return axios.put(`${REST_API_BASE_URL}/${userID}`, user)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error updating user with ID ${userID}:`, error);
            throw error;
        });
};

// Function to deactivate a user by ID {http://localhost:8080/api/users/{userID}}
export const deactivateUser = (userID) => {
    return axios.delete(`${REST_API_BASE_URL}/${userID}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Error deactivating user with ID ${userID}:`, error);
            throw error;
        });
};

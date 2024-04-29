import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/users';

// Function to fetch the list of users {http://localhost:8080/api/users}
export const userList = () => axios.get(REST_API_BASE_URL);

// Function to add a new user {http://localhost:8080/api/users/create}
export const addUser = (user, profileImage) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    Object.keys(user).forEach(key => {
        formData.append(key, user[key]);
    });
    return axios.post(REST_API_BASE_URL + '/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}; 
//export const addUser = (user) => axios.post(REST_API_BASE_URL+ '/create', user);

// Function to get a specific user by ID {http://localhost:8080/api/users/{userID}}
export const getUser = (userID) => axios.get(`${REST_API_BASE_URL}/${userID}`);

// Function to edit/update an existing user {http://localhost:8080/api/users/{userID}}
export const editUser = (userID, user) => axios.put(`${REST_API_BASE_URL}/${userID}`, user);

// Function to deactivate a user by ID {http://localhost:8080/api/users/{userID}}
export const deactivateUser = (userID) => axios.delete(`${REST_API_BASE_URL}/${userID}`);



{/*// Function to add a new user
export const addUser = (user, profileImage) => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    Object.keys(user).forEach(key => {
        formData.append(key, user[key]);
    });
    return axios.post(REST_API_BASE_URL + '/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}; 
*/}






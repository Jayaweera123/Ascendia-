import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/users';

// Function to fetch the list of users
export const userList = () => axios.get(REST_API_BASE_URL);

// Function to add a new user
export const addUser = (user) => axios.post(REST_API_BASE_URL, user);

// Function to get a specific user by ID
export const getUser = (userID) => axios.get(REST_API_BASE_URL + '/' + userID);

// Function to edit/update an existing user
export const editUser = (userID, user) => axios.put(REST_API_BASE_URL + '/' + userID, user);

// Function to delete a user by ID
export const deactivateUser = (userID) => axios.delete(REST_API_BASE_URL + '/' + userID);


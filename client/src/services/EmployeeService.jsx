import axios from "axios";

const REST_API_BASE_URL0 = "http://localhost:8080/api/users/";

//Nethuni

export const getUserDetails = (userId) =>
  axios.get(REST_API_BASE_URL0 + userId);

export const getAllAvailableUsers = () =>
  axios.get(REST_API_BASE_URL0 + "all/available");

export const addAssignment = (assignment) =>
  axios.post("http://localhost:8080/api/project/user/add", assignment);

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/project";

export const getAllProjectCards = () => axios.get(REST_API_BASE_URL + '/all');


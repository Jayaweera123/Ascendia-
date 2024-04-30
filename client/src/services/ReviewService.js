import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/reviews';

// Function to fetch the list of reviews {http://localhost:8080/api/reviews}
export const reviewsList = () => axios.get(REST_API_BASE_URL + '/getAll');

// Function to add a review
export const addReview = (review) => axios.post(REST_API_BASE_URL + '/add', review);









    
import axios from "axios";

// Base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/reviews';

// Function to fetch the list of reviews
export const reviewList = () => axios.get(REST_API_BASE_URL);

// Function to add a review
export const addreview = (user) => axios.post(REST_API_BASE_URL, user);

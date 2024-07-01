import axios from "axios";

class ReviewService {
    static BASE_URL = "http://localhost:8080";

    // Function to fetch the list of reviews for a specific project
    static getAllReviews = async (token, projectId) => {
        try {
            const response = await axios.get(`${ReviewService.BASE_URL}/reviews/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    projectId // Ensure projectId is sent as a query parameter
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error;
        }
    };

    // Function to add a review
    static addReview = async (review, token) => {
        try {
            const response = await axios.post(`${ReviewService.BASE_URL}/client/add`, review, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error adding review:", error);
            throw error;
        }
    };

    /** AUTHENTICATION CHECKER */

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isClient() {
        const designation = localStorage.getItem('designation');
        return designation === 'Client' || designation === 'Consultant';
    }

    static clientOnly() {
        return this.isAuthenticated() && this.isClient();
    }

}

export default ReviewService;

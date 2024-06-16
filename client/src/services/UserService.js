import axios from "axios";

// Base URL for the REST API
{/*const REST_API_BASE_URL = 'http://localhost:1010';

// Function to fetch the list of users {http://localhost:8080/api/users/getAll}
export const userList = () => {
    return axios.get(`${REST_API_BASE_URL}/getAll`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching user list:", error);
            throw error;
        });
};

  
//commented one
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

// Function to add a new user
export const addUser = async (user, profileImage) => {
    try {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });

        const response = await axios.post(`${REST_API_BASE_URL}/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
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

//you tube
static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    } */}

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(username, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {username, password});
            return response.data;

        }catch(err){
            console.error("Error logging in:", err);
            throw err;
        }
    }

    static async addUser(user, profileImage, token) {
        if (!user || typeof user !== 'object') {
            throw new Error("Invalid user data");
        }
        if (!profileImage || !(profileImage instanceof File)) {
            throw new Error("Invalid profile image");
        }
        if (!token) {
            throw new Error("Token is required");
        }

        try {
            const formData = new FormData();
            formData.append('profileImage', profileImage);
            Object.keys(user).forEach(key => {
                formData.append(key, user[key]);
            });

            const response = await axios.post(`${UserService.BASE_URL}/admin/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("Server error:", error.response.data);
                if (error.response.status === 403) {
                    console.error("Forbidden: Access is denied. Ensure the token has the correct permissions.");
                }
            } else if (error.request) {
                // Request was made but no response was received
                console.error("Network error:", error.request);
            } else {
                // Something else happened while setting up the request
                console.error("Error:", error.message);
            }
            throw error;
        }
    }
    

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/getAllUsers`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error("Error fetching all users:", err);
            throw err;
        }
    }


    

    static async getUserById(userID, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/getUser/${userID}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error(`Error fetching user with ID ${userID}:`, err);
            throw err;
        }
    }

    static async deactivateUser(userID, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userID}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error(`Error deactivating user with ID ${userID}:`, err);
            throw err;
        }
    }


    static async updateUser(userID, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userID}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error(`Error updating user with ID ${userID}:`, err);
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('designation')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const designation = localStorage.getItem('designation')
        return designation === 'ADMIN'
    }

    static isUser(){
        const designation = localStorage.getItem('designation')
        return designation === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

    

}

export default UserService;

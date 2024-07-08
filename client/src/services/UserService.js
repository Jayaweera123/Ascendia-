import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(username, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { username, password });
            const userData = response.data;
            if (userData.token) {
                console.log('Storing token:', userData.token); // Debug: Log the token
                localStorage.setItem('token', userData.token);
                localStorage.setItem('userID', userData.userID);
                localStorage.setItem('designation', userData.designation);          
                localStorage.setItem('projectIDs', JSON.stringify(userData.projectIDs)); // Store project IDs
            }
            return userData;
        } catch (err) {
            console.error("Error logging in:", err);
            throw err;
        }
    }

    static async addUser(formData, profileImage, token) {
        if (!token) {
            throw new Error("Token is required");
        }
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            UserService.handleError(error);
        }
    }


    static async updateUser(userID, formData, profileImage, token) {
        if (!userID || !formData) throw new Error("Invalid user data or userID");
        if (!token) throw new Error("Token is required");

        try {
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            UserService.handleError(error);
        }
    }

    static handleError(error) {
        if (error.response) {
            console.error("Server error:", error.response.data);
            if (error.response.status === 403) {
                console.error("Forbidden: Access is denied. Ensure the token has the correct permissions.");
            }
        } else if (error.request) {
            console.error("Network error:", error.request);
        } else {
            console.error("Error:", error.message);
        }
        throw error;
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
            const response = await axios.delete(`${UserService.BASE_URL}/admin/deactivate/${userID}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error(`Error deactivating user with ID ${userID}:`, err);
            throw err;
        }
    }

    static async getUserByFirstNameAndLastName(firstName, lastName, token) {
        try {
            console.log(`Request URL: ${UserService.BASE_URL}/admin/name`);
            console.log(`Params:`, { firstName, lastName });
            
            const response = await axios.get(`${UserService.BASE_URL}/admin/name`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { firstName, lastName }
            });
            return response.data;
        } catch (err) {
            if (err.response) {
                console.error(`Error fetching user by name ${firstName} ${lastName}:`, err.response);
            } else if (err.request) {
                console.error('No response received:', err.request);
            } else {
                console.error('Error setting up the request:', err.message);
            }
            throw err;
        }
    }
    
    
    

    static async getOnlineUsers(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/onlineUsers`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching online users:", err);
            throw err;
        }
    }

    

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('designation');
        localStorage.removeItem('userID');
        //localStorage.setItem('projectIDs', JSON.stringify(userData.projectIDs));
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static getUserID() {
        return localStorage.getItem('userID');
    }

    static getDesignation() {
        return localStorage.getItem('designation');
    }

    static isAdmin(){
        const designation = localStorage.getItem('designation')
        return designation === 'Administrator'
    }

    static isUser(){
        const designation = localStorage.getItem('designation')
        return designation === 'USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    

}

{/*
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

export default UserService;

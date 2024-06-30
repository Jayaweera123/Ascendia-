import axios from "axios";

// Helper function to get the token
const getToken = () => localStorage.getItem('token');

// Create an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//Material
export const listMaterial = (projectId) => api.get('/store/material/getAllMaterials/' + projectId);

export const createMaterial = (material) => api.post('/skeeperonly/material/createMaterial', material);

export const getMaterial = (materialId) => api.get('/store/material/getMaterialById/' + materialId);

export const editMaterial = (materialId, material) => api.put('/skeeperonly/material/editMaterial/' + materialId, material);

export const deleteMaterial = (materialId) => api.delete('/skeeperonly/material/deleteMaterial/' + materialId);

export const searchMaterial = (projectId, query) => api.get(`/store/material/searchMaterial/${projectId}?query=${query}`);

export const inventoryUpdateMaterial = (materialId, material) => api.put('/skeeperonly/material/updateInventory/material/' + materialId, material);

export const getAllUpdatedMaterials = (projectId) => api.get('/store/material/getAllUpdatedMaterials/' + projectId);

export const searchUpdatedMaterial = (projectId, query) => api.get(`/store/material/searchUpdatedMaterial/${projectId}?query=${query}`);

export const getAllNotifications = (userId) => api.get('/skeeperonly/material/getAllNotifications/' + userId);

export const getLowStockMaterials = (projectId) => api.get('/store/material/lowStockMaterials/' + projectId);

export const setAsNotificationSeen = (notificationId, notificationData) => api.put('/skeeperonly/material/notificationSeen/' + notificationId, notificationData);

export const markAllNotificationsAsSeen = (userId) => api.put('/skeeperonly/material/markAllAsSeen/' + userId);

export const getUnseenNotifications = (userId) => api.get('/skeeperonly/material/unseenNotifications/' + userId);

//Equipment
export const listEquipment = (projectId) => api.get('/store/equipment/getAllEquipment/' + projectId);

export const createEquipment = (equipment) => api.post('/skeeperonly/equipment/createEquipment', equipment);

export const getEquipment = (equipmentId) => api.get('/store/equipment/getEquipmentById/' + equipmentId);

export const editEquipment = (equipmentId, equipment) => api.put('/skeeperonly/equipment/editEquipment/' + equipmentId, equipment);

export const deleteEquipment = (equipmentId) => api.delete('/skeeperonly/equipment/deleteEquipment/' + equipmentId);

export const searchEquipment = (projectId, query) => api.get(`/store/equipment/searchEquipment/${projectId}?query=${query}`);

export const inventoryUpdateEquipment = (equipmentId, equipment) => api.put('/skeeperonly/equipment/updateInventory/equipment/' + equipmentId, equipment);

export const getAllUpdatedEquipment = (projectId) => api.get('/store/equipment/getAllUpdatedEquipments/' + projectId);

export const searchUpdatedEquipment = (projectId, query) => api.get(`/store/equipment/searchUpdatedEquipment/${projectId}?query=${query}`);

/** AUTHENTICATION CHECKER */
class AuthService {

    static logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('designation')
    }

    // Check if the user is authenticated by verifying if token exists in localStorage
    static isAuthenticated() {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists, otherwise false
    }
  
    // Check if the user's designation allows access to store-related functionalities
    static isStore() {
      const designation = localStorage.getItem('designation');
      const allowedDesignations = [
        'Store Keeper',
        'Quantity Surveyor',
        'Site Engineer',
        'Project Manager',
        'Project Creation Team'
      ];
      return allowedDesignations.includes(designation);
    }
  
    // Check if the user is authenticated and has a designation allowing store-related functionalities
    static storeOnly() {
      return this.isAuthenticated() && this.isStore();
    }

    static isSkeeper() {
        const designation = localStorage.getItem('designation');
        const allowedDesignations = [
          'Store Keeper',
          'Quantity Surveyor',
          'Project Manager',
          'Project Creation Team'
        ];
        return allowedDesignations.includes(designation);
      }
    
      static skeeperOnly() {
        return this.isAuthenticated() && this.isSkeeper();
      }

      static isSkeeperonly() {
        const designation = localStorage.getItem('designation');
        const allowedDesignations = [
          'Store Keeper'
        ];
        return allowedDesignations.includes(designation);
      }
    
      static skeeperonlyOnly() {
        return this.isAuthenticated() && this.isSkeeperonly();
      }
  }
  
  export default AuthService;
  
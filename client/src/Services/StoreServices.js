import axios from "axios";

//Material
export const listMaterial = (projectId) => axios.get('http://localhost:8080/store/material/getAllMaterials/'+ projectId);

export const createMaterial = (material) => axios.post('http://localhost:8080/store/material/createMaterial', material);

export const getMaterial = (materialId) => axios.get('http://localhost:8080/api/material/getMaterialById/' + materialId);

export const editMaterial = (materialId, material) => axios.put('http://localhost:8080/api/material/editMaterial/' + materialId, material);

export const searchMaterial = (projectId, query) => axios.get(`http://localhost:8080/api/material/searchMaterial/${projectId}?query=${query}`);

export const inventoryUpdateMaterial = (materialId, material) => axios.put('http://localhost:8080/api/material/updateInventory/material/'+ materialId, material);

export const getAllUpdatedMaterials = (projectId) => axios.get('http://localhost:8080/api/material/getAllUpdatedMaterials/' + projectId);

export const searchUpdatedMaterial = (projectId, query) => axios.get(`http://localhost:8080/api/material/searchUpdatedMaterial/${projectId}?query=${query}`);


//Equipment
export const listEquipment = (projectId) => axios.get('http://localhost:8080/api/equipment/getAllEquipment/' + projectId);

export const createEquipment = (equipment) => axios.post('http://localhost:8080/api/equipment/createEquipment', equipment);

export const getEquipment = (equipmentId) => axios.get('http://localhost:8080/api/equipment/getEquipmentById/' + equipmentId);

export const editEquipment = (equipmentId, equipment) => axios.put('http://localhost:8080/api/equipment/editEquipment/' + equipmentId, equipment);

export const searchEquipment = (projectId, query) => axios.get(`http://localhost:8080/api/equipment/searchEquipment/${projectId}?query=${query}`);

export const inventoryUpdateEquipment = (equipmentId, equipment) => axios.put('http://localhost:8080/api/equipment/updateInventory/equipment/' + equipmentId, equipment);

/** AUTHENTICATION CHECKER */
class AuthService {
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
  
export const getAllUpdatedEquipment = (projectId) => axios.get('http://localhost:8080/api/equipment/getAllUpdatedEquipments/' + projectId);

export const searchUpdatedEquipment = (projectId, query) => axios.get(`http://localhost:8080/api/equipment/searchUpdatedEquipment/${projectId}?query=${query}`);


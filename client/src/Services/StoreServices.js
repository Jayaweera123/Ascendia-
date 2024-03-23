import axios from "axios";

//Material
export const listMaterial = () => axios.get('http://localhost:8080/api/material/getAllMaterials');

export const createMaterial = (material) => axios.post('http://localhost:8080/api/material/createMaterial', material);

export const getMaterial = (materialId) => axios.get('http://localhost:8080/api/material/getMaterialById' + materialId);

export const editMaterial = (materialId, material) => axios.put('http://localhost:8080/api/material/editMaterial' + materialId, material);

export const searchMaterial = (query) => axios.get(`http://localhost:8080/api/material/searchMaterial?query=${query}`);

//Equipment
export const listEquipment = () => axios.get('http://localhost:8080/api/equipment/getAllEquipment');

export const createEquipment = (equipment) => axios.post('http://localhost:8080/api/equipment/createEquipment', equipment);

export const getEquipment = (equipmentId) => axios.get('http://localhost:8080/api/equipment/getEquipmentById' + equipmentId);

export const editEquipment = (equipmentId, equipment) => axios.put('http://localhost:8080/api/equipment/editEquipment' + equipmentId, equipment);

export const searchEquipment = (query) => axios.get(`http://localhost:8080/api/equipment/searchEquipment?query=${query}`);
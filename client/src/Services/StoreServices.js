import axios from "axios";

export const listMaterial = () => axios.get('http://localhost:8080/api/material/getAllMaterials');

export const createMaterial = (material) => axios.post('http://localhost:8080/api/material/createMaterial', material);

export const getMaterial = (materialId) => axios.get('http://localhost:8080/api/material/getMaterialById' + materialId);

export const editMaterial = (materialId, material) => axios.put('http://localhost:8080/api/material/editMaterial' + materialId, material);
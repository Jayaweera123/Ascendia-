import React, { useEffect, useState } from "react";
import { listMaterial, listEquipment, getLowStockMaterials} from "../../../services/StoreServices";


const DashboardCards = ({givenProjectId}) => {


  const [material, setMaterial] = useState([]);
  const [materialCount, setMaterialCount] = useState(0);
  const [equipment, setEquipment] = useState([]);
  const [equipmentCount, setEquipmentCount] = useState(0);
  const [lowStockMaterial, setLowStockMaterial] = useState([]);
  const [lowStockMaterialCount, setLowStockMaterialCount] = useState(0);


  //Set total number of material count
  useEffect(() => {
    listMaterial(givenProjectId).then((response) => {
        setMaterial(response.data); 
        console.log('material', material);
        setMaterialCount(response.data.length);
        console.log('materialCount', materialCount);
    }).catch(error => {
        console.error(error);
    })
  }, [])

  useEffect(() => {
    console.log('Updated materialCount', materialCount);
  }, [materialCount]);

  //Set total number of equipment count
  useEffect(() => {
    listEquipment(givenProjectId).then((response) => {
        setEquipment(response.data); 
        console.log('equipment', equipment);
        setEquipmentCount(response.data.length);
        console.log('equipmentCount', equipmentCount);
    }).catch(error => {
        console.error(error);
    })
  }, [])

  useEffect(() => {
    console.log('Updated equipmentCount', equipmentCount);
  }, [equipmentCount]);

  //Set total number of low stock material count
  useEffect(() => {
    getLowStockMaterials(givenProjectId).then((response) => {
        setLowStockMaterial(response.data);
        console.log('Low Stock Material', lowStockMaterial);
        setLowStockMaterialCount(response.data.length); 
        console.log('LowStockMaterialCount', lowStockMaterialCount);
    }).catch(error => {
        console.error(error);
    })
  }, [])

  useEffect(() => {
    console.log('Updated LowStockMaterialCount', lowStockMaterialCount);
  }, [materialCount]);



  return (
    <div>
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3">

        {/***************************** Total number of material count card ****************************/}
        <div className="relative p-6 text-gray-700 bg-white rounded-md shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 rtl:space-x-reverse dark:text-gray-400">
              <span>Total number of materials</span>
            </div>
            <div className="text-3xl dark:text-gray-100">
              {materialCount}
            </div>
          </div>
        </div>

        {/***************************** Total number of equipment count card ****************************/}
        <div className="relative p-6 text-gray-700 bg-white rounded-md shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 rtl:space-x-reverse dark:text-gray-400">
              <span>Total number of equipment</span>
            </div>
            <div className="text-3xl dark:text-gray-100">
              {equipmentCount}
            </div>
          </div>
        </div>

        {/************************** Total number of low stock material count card ***********************/}
        <div className="relative p-6 text-gray-700 bg-white rounded-md shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500 rtl:space-x-reverse dark:text-gray-400">
              <span>Low Stock materials</span>
            </div>
            <div className="text-3xl dark:text-gray-100">{lowStockMaterialCount}</div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default DashboardCards;
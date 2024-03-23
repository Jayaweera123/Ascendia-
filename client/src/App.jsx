import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";

{/*Deshani*/}
import Dashboard from "./pages/Store/Dashboard";
import UpdateInventory from "./pages/Store/UpdateInventory";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialComponent from "./components/Store/MaterialComponent";
import Equipment from "./pages/Store/Equipment";
import EquipmentComponent from "./components/Store/EquipmentComponent";
import UpdateMaterialComponent from "./components/Store/UpdateMaterialComponent";
// import UpdateEquipmentComponent from "./components/Store/UpdateEquipmentComponent";



const App = () => {
  return (
    <div>
      <Routes>
      {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sideNavigation" element={<SideNavigation />} />
        <Route path="/topNavigation" element={<TopNavigation />} />

      {/*Deshani*/}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/updateInventory" element={<UpdateInventory />} />
      <Route path="/material" element={<Material/>} />
      <Route path="/viewHistory" element={<ViewHistory />} />
      <Route path="/addMaterial" element={<MaterialComponent />} />
      <Route path="/editMaterial/:id" element = {<MaterialComponent/>}/>
      <Route path="/equipment" element={<Equipment/>} />
      <Route path="/addEquipment" element={<EquipmentComponent />} />
      <Route path="/editEquipment/:id" element={<EquipmentComponent />} />
      <Route path="/updateMaterial/:id" element={<UpdateMaterialComponent />} />
      {/* <Route path="/updateEquipment/:id" element={<UpdateEquipmentComponent/>} /> */}
       
      </Routes>
    </div>
  );
};

export default App;
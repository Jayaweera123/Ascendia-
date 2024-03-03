import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/Store/SideNavigationStore";
import TopNavigation from "./components/Store/TopNavigationStore";

{/*Deshani*/}
import Dashboard from "./pages/Store/Dashboard";
import UpdateInventory from "./pages/Store/UpdateInventory";
//import MaterialsAndEquipments from "./pages/Store/MaterialsAndEquipments";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialComponent from "./components/Store/MaterialComponent";
//import AddNewMaterials from "./pages/Store/AddNewMaterial";
//import AddNewEquipment from "./pages/Store/AddNewEquipment";


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
      {/*<Route path="/addNewEquipment" element={<AddNewEquipment />} /> */}
       
      </Routes>
    </div>
  );
};

export default App;
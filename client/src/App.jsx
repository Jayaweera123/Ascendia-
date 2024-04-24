import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";
import ContactForm from "./pages/ContactForm";

{/*Deshani*/}
import Dashboard from "./pages/Store/Dashboard";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialForm from "./components/Store/MaterialForm";
import Equipment from "./pages/Store/Equipment";
import EquipmentForm from "./components/Store/EquipmentForm";
import UpdateMaterialForm from "./components/Store/UpdateMaterialForm";
import UpdateEquipmentForm from "./components/Store/UpdateEquipmentForm";


const App = () => {
  return (
    <div>
       <BrowserRouter>
      <Routes>
      {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sideNavigation" element={<SideNavigation />} />
        <Route path="/topNavigation" element={<TopNavigation />} />

      {/*Deshani*/}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/material" element={<Material/>} />
      <Route path="/viewHistory" element={<ViewHistory />} />
      <Route path="/addMaterial" element={<MaterialForm />} />
      <Route path="/editMaterial/:id" element = {<MaterialForm/>}/>
      <Route path="/equipment" element={<Equipment/>} />
      <Route path="/addEquipment" element={<EquipmentForm />} />
      <Route path="/editEquipment/:id" element={<EquipmentForm />} />
      <Route path="/updateMaterial/:id" element={<UpdateMaterialForm />} />
      <Route path="/updateEquipment/:id" element={<UpdateEquipmentForm />} />
      
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
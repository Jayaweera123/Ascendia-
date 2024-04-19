import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";
import Loginn from "./pages/Loginn";


const App = () => {
  return (
    <div>
      <Routes>
      {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sideNavigation" element={<SideNavigation />} />
        <Route path="/topNavigation" element={<TopNavigation />} />
        <Route path="/loginn" element={<Loginn />} />

       
      </Routes>
    </div>
  );
};

export default App;
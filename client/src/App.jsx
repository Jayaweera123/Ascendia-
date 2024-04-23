import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";
import ContactForm from "./pages/ContactForm";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Ravindu */}
          <Route path="/" element={<Home />} />
          <Route path="/sideNavigation" element={<SideNavigation />} />
          <Route path="/topNavigation" element={<TopNavigation />} />
          <Route path="/contactform" element={<ContactForm/>}/>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
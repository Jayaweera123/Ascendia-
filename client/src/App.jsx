import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigation from "./components/SideNavigation";
import TopNavigation from "./components/TopNavigation";
import Loginn from "./pages/Loginn";
import ContactForm from "./pages/ContactForm";
import Projects from "./pages/projects";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Ravindu */}
          <Route path="/" element={<Home />} />
          <Route path="/sideNavigation" element={<SideNavigation />} />
          <Route path="/topNavigation" element={<TopNavigation />} />
          <Route path="/loginn" element={<Loginn />} />
          <Route path="/contactform" element={<ContactForm/>}/>
          <Route path="/projects" element={<Projects/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
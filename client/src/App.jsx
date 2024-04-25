import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SideNavigationClient from "./components/Client/SideNavigationClient";
import SideNavigationAdmin from "./components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "./components/Admin/TopNavigationAdmin";
import TopNavigationClient from "./components/Client/TopNavigationClient";
import { useParams } from "react-router-dom";



{/* Rashmi - Login */}
import Login from "./pages/Login/Login";

{/* Rashmi - Progress */}
import Progress from "./pages/Progress/Progress";

{/* Rashmi - Admin */}
import AddUser from "./pages/Admin/AddUser";
import AdDashboard from "./pages/Admin/AdDashboard";
import UserList from "./pages/Admin/UserList";

{/* Rashmi - Client */}
import ClDashboard from "./pages/Client/ClDashboard";
import AddReview from "./pages/Client/AddReview";


const App = () => {
  return (
    <div>
      <Routes>
      {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sidenavigationclient" element={<SideNavigationClient />} />
        <Route path="/sidenavigationadmin" element={<SideNavigationAdmin />} />
        <Route path="/topNavigationAdmin" element={<TopNavigationAdmin />} />
        <Route path="/topNavigationClient" element={<TopNavigationClient />} />

      {/* Rashmi - Admin */}
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<AddUser/>}/>
        <Route path="/admin/dashboard" element={<AdDashboard/>}/>
        <Route path="/userlist" element={<UserList/>}/>


      {/* Rashmi - Client */}
        <Route path="/client/dashboard" element={<ClDashboard/>}/>
        <Route path="/addreview" element={<AddReview />} />

      {/* Rashmi - Login */}
      <Route path="/login" element={<Login />} />

      {/* Rashmi - Progress */}
      <Route path="/progress" element={<Progress />} />

   
       
      </Routes>
    </div>
  );
};

export default App;
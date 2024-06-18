import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import SideNavigation from "./components/ProjectManager/SideNavigation";
import TopNavigation from "./components/TopNavigation";


{/*Ravindu*/}
import AddProject from "./pages/ProjectCreationTeam/AddProject";
import AssignEmployee from "./pages/ProjectCreationTeam/AssignEmployee";
//import AssignPM from "./pages/ProjectCreationTeam/AssignPM";
import ContactForm from "./pages/ContactForm";
import ProjectService from "./services/ProjectService";

{/* Ravindu - Progress */}
import Progress from "./pages/Progress/Progress";

{/*Rashmi*/}
import SideNavigationClient from "./components/Client/SideNavigationClient";
import SideNavigationAdmin from "./components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "./components/Admin/TopNavigationAdmin";
import TopNavigationClient from "./components/Client/TopNavigationClient";
import { useParams } from "react-router-dom";
import UserService from "./services/UserService";
import Login from "./pages/Login/Login";
import AddUser from "./pages/Admin/AddUser";
import AdDashboard from "./pages/Admin/AdDashboard";
import UserList from "./pages/Admin/UserList";
import EditUser from "./pages/Admin/EditUser";

{/* Rashmi - Client */}
//import ClDashboard from "./pages/Client/ClDashboard";
import AddReview from "./pages/Client/AddReview";
import Reviews from "./pages/Client/Reviews";
import ReviewService from "./services/ReviewService";
import ReviewCheck from "./components/Client/ReviewCheck";

{/*Deshani*/}
import Dashboard from "./pages/Store/Dashboard";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialForm from "./components/Store/MaterialForm";
import Equipment from "./pages/Store/Equipment";
import EquipmentForm from "./components/Store/EquipmentForm";
import UpdateMaterialForm from "./components/Store/UpdateMaterialForm";
import UpdateEquipmentForm from "./components/Store/UpdateEquipmentForm";
import StoreServices from "./services/StoreServices";
/*import { Routes, Route, useParams } from "react-router-dom";*/

{/*Nethuni*/}
import SideNavigationPM from "./components/ProjectManager/SideNavigationPM";
import TopNavigationPM from "./components/ProjectManager/TopNavigationPM";
import Projects from "./pages/ProjectManager/Projects";
import HomePM from "./pages/ProjectManager/HomePM";
import ProjectDashboard from "./pages/ProjectManager/ProjectDashboard";
import Tasks from "./pages/ProjectManager/Tasks";
import Employees from "./pages/ProjectManager/Employees";
import ProjectProgress from "./pages/ProjectManager/ProjectProgress";
import AddTaskForm from "./components/ProjectManager/AddTaskForm";
import AddTask from "./pages/ProjectManager/AddTask";
import TasksForProject from "./pages/ProjectManager/TasksForProject";
import Jobs from "./pages/ProjectManager/Jobs";
import TaskService from "./services/TaskService";





const App = () => {
  return (
    <div>
       <BrowserRouter>
      <Routes>

        {/* Rashmi - Login */}
        <Route exact path="/" element={<Login />} /> 
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />‰

        {/* Ravindu - Progress */}
        <Route path="/progress" element={<Progress />} />

        {/* Rashmi - Client */}
        <Route path="/reviews" element={<Reviews />} /> 
        
        {/* Check if user is authenticated and admin before rendering admin-only routes */}
        {UserService.adminOnly() && (
          <>
            <Route path="/admin/adduser" element={<AddUser />} />         
            <Route path="/admin/dashboard" element={<AdDashboard/>}/>
            <Route path="/admin/userlist" element={<UserList/>}/>
            <Route path="/admin/update/:userID" element={<AddUser/>}/>
          </>
        )}

        <Route path="/sidenavigationclient" element={<SideNavigationClient />} />
        <Route path="/sidenavigationadmin" element={<SideNavigationAdmin />} />
        <Route path="/topNavigationAdmin" element={<TopNavigationAdmin />} />
        <Route path="/topNavigationClient" element={<TopNavigationClient />} />

        {/* Rashmi - Client */}
        {ReviewService.creviewOnly() && (
          <>
            {/*<Route path="/client/dashboard" element={<ClDashboard/>}/>*/}
            <Route path="/addreview" element={<AddReview />} />
            <Route path="/reviewcheck" element={<ReviewCheck />} />
          </>
        )}
   

        {/* Ravindu */}

        {ProjectService.projectOnly() && (
          <>
            <Route path="/sideNavigation" element={<SideNavigation />} />
            <Route path="/topNavigation" element={<TopNavigation />} />
            <Route path="/project/addProject" element={<AddProject/>}/>
            <Route path="/project/assignEmployee" element={<AssignEmployee/>}/>
          </>
        )}
        
       
        {/*ProjectManager */}
        {TaskService.pmanagerOnly() && (
          <>
        <Route path="/pmanager/home" element={<HomePM />} />
        <Route path="/topNavigationPM" element={<TopNavigationPM />} />
        <Route path="/sideNavigationPM" element={<SideNavigationPM />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pmanager/dashboard" element={<ProjectDashboard />} />
        <Route path="/tasks" element={<Tasks />} />      
        <Route path="/employees" element={<Employees />} />
          </>
        )}

        {TaskService.pmanageronlyOnly() && (
          <>
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<AddTask />} />
          </>
        )}


        {/** 
       <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject />}
        />

      {/*Deshani*/}

      {StoreServices.storeOnly() && (
        <>
          <Route path="/store/dashboard" element={<Dashboard />} />
          <Route path="/store/material" element={<Material/>} />     
          <Route path="/store/equipment" element={<Equipment/>} />
  
        </>
      )}
      {StoreServices.skeeperOnly() && (
        <>
          <Route path="/viewHistory" element={<ViewHistory />} />
        </>
      )}
      {StoreServices.skeeperonlyOnly() && (
        <>
          <Route path="/store/material/createMaterial" element={<MaterialForm />} />
          <Route path="/editMaterial/:id" element = {<MaterialForm/>}/>
          <Route path="/addEquipment" element={<EquipmentForm />} />
          <Route path="/editEquipment/:id" element={<EquipmentForm />} />
          <Route path="/updateMaterial/:id" element={<UpdateMaterialForm />} />
          <Route path="/updateEquipment/:id" element={<UpdateEquipmentForm />} />
          </>
      )}
      
        <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject projectId={3} />}
        />
      
        <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject />}
        />
        <Route path="/tasks/:taskId/jobs" element={<Jobs />} />


        

      


      
        


      
      

       
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

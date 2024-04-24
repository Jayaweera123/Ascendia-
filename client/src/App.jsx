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
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
{/*Nethuni*/}
import SideNavigation from "./components/ProjectManager/SideNavigationPM";
import TopNavigation from "./components/ProjectManager/TopNavigation";
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

//import SideNavigationPM from "./components/ProjectManager/SideNavigationPM";

const App = () => {
  return (
    <div>
       <BrowserRouter>
      <Routes>
        {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sideNavigation" element={<SideNavigation />} />
        <Route path="/topNavigation" element={<TopNavigation />} />
        {/*ProjectManager */}
        <Route path="/pmhome" element={<HomePM />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pmdashboard" element={<ProjectDashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<AddTask />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/progress" element={<ProjectProgress />} />
        {/** 
       <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject />}
        />

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

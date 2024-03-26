import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import SideNavigation from "./components/Nethuni/SideNavigationPM";
import TopNavigation from "./components/Nethuni/TopNavigation";
import Projects from "./pages/ProjectManager/Projects";
import HomePM from "./pages/ProjectManager/HomePM";
import ProjectDashboard from "./pages/ProjectManager/ProjectDashboard";
import Tasks from "./pages/ProjectManager/Tasks";
import Employees from "./pages/ProjectManager/Employees";
import ProjectProgress from "./pages/ProjectManager/ProjectProgress";
import AddTaskForm from "./components/Nethuni/AddTaskForm";
import AddTask from "./pages/ProjectManager/AddTask";

//import SideNavigationPM from "./components/Nethuni/SideNavigationPM";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Ravindu */}
        <Route path="/" element={<Home />} />
        <Route path="/sideNavigation" element={<SideNavigation />} />
        <Route path="/topNavigation" element={<TopNavigation />} />
        {/*Nethuni */}
        <Route path="/pmhome" element={<HomePM />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/pmdashboard" element={<ProjectDashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<AddTask />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/progress" element={<ProjectProgress />} />
      </Routes>
    </div>
  );
};

export default App;

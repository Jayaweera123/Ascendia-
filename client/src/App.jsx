import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";

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

        <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject projectId={3} />}
        />
      */}
        <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject />}
        />
        <Route path="/tasks/:taskId/jobs" element={<Jobs />} />
      </Routes>
    </div>
  );
};

export default App;

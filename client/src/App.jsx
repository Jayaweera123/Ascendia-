import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import SideNavigation from "./components/ProjectManager/SideNavigation";
import TopNavigation from "./components/TopNavigation";

{
  /*Ravindu*/
}
import AddProject from "./pages/ProjectCreationTeam/AddProject";
import AssignEmployee from "./pages/ProjectCreationTeam/AssignEmployee";
//import AssignPM from "./pages/ProjectCreationTeam/AssignPM";
import ContactForm from "./pages/ContactForm";

{
  /*Rashmi*/
}
import SideNavigationClient from "./components/Client/SideNavigationClient";
import SideNavigationAdmin from "./components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "./components/Admin/TopNavigationAdmin";
import TopNavigationClient from "./components/Client/TopNavigationClient";
import { useParams } from "react-router-dom";

{
  /* Rashmi - Login */
}
import Login from "./pages/Login/Login";

{
  /* Rashmi - Progress */
}
import Progress from "./pages/Progress/Progress";

{
  /* Rashmi - Admin */
}
import AddUser from "./pages/Admin/AddUser";
import AdDashboard from "./pages/Admin/AdDashboard";
import UserList from "./pages/Admin/UserList";

{
  /* Rashmi - Client */
}
//import ClDashboard from "./pages/Client/ClDashboard";
import AddReview from "./pages/Client/AddReview";

{
  /*Deshani*/
}
import Dashboard from "./pages/Store/Dashboard";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialForm from "./components/Store/MaterialForm";
import Equipment from "./pages/Store/Equipment";
import EquipmentForm from "./components/Store/EquipmentForm";
import UpdateMaterialForm from "./components/Store/UpdateMaterialForm";
import UpdateEquipmentForm from "./components/Store/UpdateEquipmentForm";
/*import { Routes, Route, useParams } from "react-router-dom";*/

{
  /*Nethuni*/
}
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
import EditTask from "./pages/ProjectManager/EditTask";
import AddEmployee from "./pages/ProjectManager/AddEmployee";
import EmployeeHistory from "./pages/ProjectManager/EmployeeHistory";
import EditTask0 from "./pages/ProjectManager/EditTask0";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Ravindu */}
          <Route path="/" element={<Home />} />
          <Route path="/sideNavigation" element={<SideNavigation />} />
          <Route path="/topNavigation" element={<TopNavigation />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/assignEmployee" element={<AssignEmployee />} />

          {/*ProjectManager */}
          <Route path="/:pmId/pmhome" element={<HomePM />} />
          <Route path="/topNavigationPM" element={<TopNavigationPM />} />
          <Route path="/sideNavigationPM" element={<SideNavigationPM />} />
          <Route path="/:pmId/project" element={<Projects />} />
          <Route path="/pmdashboard" element={<ProjectDashboard />} />
          <Route path="/task" element={<Tasks />} />
          <Route path="/:projectId/addtask" element={<AddTask />} />
          <Route path=":projectId/edit-task/:taskId" element={<EditTask />} />
          <Route
            path="/t/:projectId/edit-task/:taskId"
            element={<EditTask0 />}
          />

          <Route path="/:projectId/addemployee" element={<AddEmployee />} />

          <Route path="/employees" element={<Employees />} />
          <Route path="/progress" element={<ProjectProgress />} />
          <Route
            path="/:projectId/employee-history"
            element={<EmployeeHistory />}
          />
          <Route
            path="/project/:projectId/dashboard"
            element={<ProjectDashboard />}
          />

          <Route
            path="/project/:projectId/task"
            element={<TasksForProject />}
          />
          <Route path="/project/:projectId/employee" element={<Employees />} />
          <Route
            path="/project/:projectId/progress"
            element={<ProjectProgress />}
          />

          <Route path="/task/:taskId/job" element={<Jobs />} />

          {/** 
       <Route
          path="/projects/:projectId/tasks"
          element={<TasksForProject />}
        />

      {/*Deshani*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/material" element={<Material />} />
          <Route path="/viewHistory" element={<ViewHistory />} />
          <Route path="/addMaterial" element={<MaterialForm />} />
          <Route path="/editMaterial/:id" element={<MaterialForm />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/addEquipment" element={<EquipmentForm />} />
          <Route path="/editEquipment/:id" element={<EquipmentForm />} />
          <Route path="/updateMaterial/:id" element={<UpdateMaterialForm />} />
          <Route
            path="/updateEquipment/:id"
            element={<UpdateEquipmentForm />}
          />

          <Route
            path="/sidenavigationclient"
            element={<SideNavigationClient />}
          />
          <Route
            path="/sidenavigationadmin"
            element={<SideNavigationAdmin />}
          />
          <Route path="/topNavigationAdmin" element={<TopNavigationAdmin />} />
          <Route
            path="/topNavigationClient"
            element={<TopNavigationClient />}
          />

          {/* Rashmi - Admin */}
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/edituser/:id" element={<AddUser />} />
          <Route path="/admin/dashboard" element={<AdDashboard />} />
          <Route path="/userlist" element={<UserList />} />

          {/* Rashmi - Client */}
          {/*<Route path="/client/dashboard" element={<ClDashboard/>}/>*/}
          <Route path="/addreview" element={<AddReview />} />

          {/* Rashmi - Login */}
          <Route path="/login" element={<Login />} />

          {/* Rashmi - Progress */}
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

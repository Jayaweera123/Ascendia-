import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import './shim/global.js';

{
  /*Ravindu*/
}
import SideNavigationPCTeam from "./components/ProjectCreationTeam/SideNavigationPCTeam";
import AddProject from "./pages/ProjectCreationTeam/AddProject";
import AssignPM from "./pages/ProjectCreationTeam/AssignPM";
import ProjectService from "./services/ProjectService";
import Progress from "./pages/Progress/Progress";
import ProjectsList from "./pages/ProjectCreationTeam/ProjectList";
import NewDashBoard from "./pages/ProjectCreationTeam/NewDashBoard";
import Assign from "./pages/ProjectCreationTeam/Assign";
import Pm from "./pages/ProjectCreationTeam/Pm";
import Completed from "./pages/ProjectCreationTeam/Completed"

{
  /*Rashmi*/
}
import SideNavigationClient from "./components/Client/SideNavigationClient";
import SideNavigationAdmin from "./components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "./components/Admin/TopNavigationAdmin";
import TopNavigationClient from "./components/Client/TopNavigationClient";
import UserService from "./services/UserService";
import AddUser from "./pages/Admin/AddUser";
import DashBoard from "./pages/Admin/Dashboard";
import UserList from "./pages/Admin/UserList";
import ClDashboard from "./pages/Client/ClDashboard";
import NewLogin from "./pages/Login/NewLogin";
import AddReview from "./pages/Client/AddReview";
import Reviews from "./pages/Client/Reviews";
import ReviewService from "./services/ReviewService";

{
  /*Deshani*/
}
import StoreKeeperDashboard from "./pages/Store/StoreKeeperDashboard";
import Material from "./pages/Store/Material";
import MaterialForm from "./components/Store/MaterialForm";
import Equipment from "./pages/Store/Equipment";
import EquipmentForm from "./components/Store/EquipmentForm";
import UpdateMaterialForm from "./components/Store/UpdateMaterialForm";
import UpdateEquipmentForm from "./components/Store/UpdateEquipmentForm";
import StoreServices from "./services/StoreServices";
import History from "./pages/Store/History";

{
  /*Nethuni*/
}
import SideNavigationPM from "./components/ProjectManager/SideNavigationPM";
import SideNavigation from "./components/ProjectManager/SideNavigation";
import TopNavigationPM from "./components/ProjectManager/TopNavigationPM";
import Projects from "./pages/ProjectManager/Projects";
import HomePM from "./pages/ProjectManager/HomePM";
import ProjectDashboard from "./pages/ProjectManager/ProjectDashboard";
import Tasks from "./pages/ProjectManager/Tasks";
import Employees from "./pages/ProjectManager/Employees";
import ProjectProgress from "./pages/ProjectManager/ProjectProgress";
import AddTask from "./pages/ProjectManager/AddTask";
import TasksForProject from "./pages/ProjectManager/TasksForProject";
import Jobs from "./pages/ProjectManager/Jobs";
import TaskService from "./services/TaskService";
import EditTask from "./pages/ProjectManager/EditTask";
import AddEmployee from "./pages/ProjectManager/AddEmployee";
import EmployeeHistory from "./pages/ProjectManager/EmployeeHistory";
import EditTask0 from "./pages/ProjectManager/EditTask0";
import JobList from "./pages/ProjectManager/JobList";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Rashmi - Login */}
          <Route exact path="/" element={<NewLogin />} />
          <Route exact path="/login" element={<NewLogin />} />

          <Route path="*" element={<Navigate to="/login" />} />‰

          {/* Ravindu - Progress */}
          <Route path="/progress/:projectId" element={<Progress />} />

          {/* Rashmi - Client */}
          <Route path="/reviews/:projectId" element={<Reviews />} />
         
          {/* Check if user is authenticated and admin before rendering admin-only routes */}
          {UserService.adminOnly() && (
            <>
              <Route path="/admin/adduser" element={<AddUser />} />         
              <Route path="/admin/dashboard" element={<DashBoard/>}/>
              <Route path="/admin/userlist" element={<UserList/>}/>
              <Route path="/admin/update/:userID" element={<AddUser/>}/>
              <Route path="/sidenavigationadmin" element={<SideNavigationAdmin />}/>
              <Route path="/topNavigationAdmin" element={<TopNavigationAdmin />} />
            </>
          )}
          {/* Rashmi - Client */}
          {ReviewService.clientOnly() && (
            <>
              <Route path="/addreview/:projectId" element={<AddReview />} />
              <Route path="/client/dashboard" element={<ClDashboard />} />
              <Route path="/sidenavigationclient" element={<SideNavigationClient />} />
              <Route path="/topNavigationClient"element={<TopNavigationClient />}/>
            </>
          )}
          {/* Ravindu */}
          {ProjectService.projectOnly() && (
            <>
              <Route
                path="/sideNavigationPCTeam"
                element={<SideNavigationPCTeam />}
              />
              <Route path="/topNavigation" element={<TopNavigation />} />
              <Route path="/project/addProject" element={<AddProject/>}/>
              <Route path="/project/update/:projectId" element={<AddProject/>}/>
              <Route path="/assignPM" element={<AssignPM/>}/>
              <Route path="/projectslist" element={<ProjectsList/>}/>
              <Route path="/project/Dashboard" element={<NewDashBoard/>}/>   
              <Route path="/project/assign" element={<Assign/>}/>
              <Route path="/project/pm" element={<Pm/>}/>
              <Route path="/project/completed" element={<Completed />} />
              <Route path="/project/assign/:projectId" element={<Assign/>}/>

            </>
          )}
          {/*ProjectManager */}
          {TaskService.pmanagerOnly() && (
            <>
              <Route path="/:pmId/pmhome" element={<HomePM />} />
              <Route path="/topNavigationPM" element={<TopNavigationPM />} />
              <Route path="/sideNavigationPM" element={<SideNavigationPM />} />
              <Route path="/sideNavigation" element={<SideNavigation />} />
              <Route path="/pmanager/projects" element={<Projects />} />
              <Route
                path="/pmanager/dashboard"
                element={<ProjectDashboard />}
              />
              <Route path="/task/:taskId/job" element={<Jobs />} />
              <Route path="/task/:taskId/joblist" element={<JobList />} />
              <Route
                path="/projects/:projectId/tasks"
                element={<TasksForProject projectId={3} />}
              />
              <Route
                path="/projects/:projectId/tasks"
                element={<TasksForProject />}
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
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
              <Route
                path="/project/:projectId/employee"
                element={<Employees />}
              />
              <Route
                path="/project/:projectId/progress"
                element={<Progress />}
              />
            </>
          )}
          {TaskService.pmanageronlyOnly() && (
            <>
              <Route path="/:projectId/addtask" element={<AddTask />} />
              <Route
                path="/t/:projectId/edit-task/:taskId"
                element={<EditTask0 />}
              />
              <Route
                path=":projectId/edit-task/:taskId"
                element={<EditTask />}
              />
              <Route path="/:projectId/addemployee" element={<AddEmployee />} />
            </>
          )}
          {/*Deshani*/}
          {StoreServices.storeOnly() && (
            <>
              <Route path="/tasks/:taskId/jobs" element={<Jobs />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/material" element={<Material />} />
              <Route
                path="/store/dashboard"
                element={<StoreKeeperDashboard />}
              />
            </>
          )}
          {StoreServices.skeeperOnly() && (
            <>
              <Route path="/history" element={<History />} />
            </>
          )}
          {StoreServices.skeeperonlyOnly() && (
            <>
              <Route path="/editMaterial/:id" element={<MaterialForm />} />
              <Route path="/addEquipment" element={<EquipmentForm />} />
              <Route path="/editEquipment/:id" element={<EquipmentForm />} />
              <Route path="/updateMaterial/:id" element={<UpdateMaterialForm />} />
              <Route path="/updateEquipment/:id" element={<UpdateEquipmentForm />} />
              <Route path="/addMaterial" element={<MaterialForm />} />  
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";

{/*Ravindu*/}
import SideNavigationPCTeam from "./components/ProjectCreationTeam/SideNavigationPCTeam";
import AddProject from "./pages/ProjectCreationTeam/AddProject";
import AssignEmployee from "./pages/ProjectCreationTeam/AssignEmployee";
import AssignPM from "./pages/ProjectCreationTeam/AssignPM";
import ProjectService from "./services/ProjectService";

{/* Ravindu - Progress */}
import Progress from "./pages/Progress/Progress";
import ProjectsList from "./pages/ProjectCreationTeam/ProjectList";
import CreationDashboard from "./pages/ProjectCreationTeam/CreationDashboard";

{/*Rashmi*/}
import SideNavigationClient from "./components/Client/SideNavigationClient";
import SideNavigationAdmin from "./components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "./components/Admin/TopNavigationAdmin";
import TopNavigationClient from "./components/Client/TopNavigationClient";
import UserService from "./services/UserService";
import Login from "./pages/Login/Login";
import AddUser from "./pages/Admin/AddUser";
import AdDashboard from "./pages/Admin/AdDashboard";
import UserList from "./pages/Admin/UserList";
//import ClDashboard from "./pages/Client/ClDashboard";
import AddReview from "./pages/Client/AddReview";
import Reviews from "./pages/Client/Reviews";
import ReviewService from "./services/ReviewService";

{/*Deshani*/}
import StoreKeeperDashboard from "./pages/Store/StoreKeeperDashboard";
import ViewHistory from "./pages/Store/ViewHistory";
import Material from "./pages/Store/Material";
import MaterialForm from "./components/Store/MaterialForm";
import Equipment from "./pages/Store/Equipment";
import EquipmentForm from "./components/Store/EquipmentForm";
import UpdateMaterialForm from "./components/Store/UpdateMaterialForm";
import UpdateEquipmentForm from "./components/Store/UpdateEquipmentForm";
import StoreServices from "./services/StoreServices";
import History from "./pages/Store/History";

{/*Nethuni*/}
import SideNavigationPM from "./components/ProjectManager/SideNavigationPM";
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

          <Route path="/sidenavigationclient" element={<SideNavigationClient />} />
          <Route path="/sidenavigationadmin" element={<SideNavigationAdmin />} />
          <Route path="/topNavigationAdmin" element={<TopNavigationAdmin />} />
          <Route path="/topNavigationClient" element={<TopNavigationClient />} />
        
          {/* Check if user is authenticated and admin before rendering admin-only routes */}
          {UserService.adminOnly() && (
            <>
              <Route path="/admin/adduser" element={<AddUser />} />         
              <Route path="/admin/dashboard" element={<AdDashboard/>}/>
              <Route path="/admin/userlist" element={<UserList/>}/>
              <Route path="/admin/update/:userID" element={<AddUser/>}/>
            </>
          )}

          {/* Rashmi - Client */}
          {ReviewService.creviewOnly() && (
            <>
              {/*<Route path="/client/dashboard" element={<ClDashboard/>}/>*/}
              <Route path="/addreview" element={<AddReview />} />
            </>
          )}
   
          {/* Ravindu */}
          {ProjectService.projectOnly() && (
            <>
              <Route path="/sideNavigationPCTeam" element={<SideNavigationPCTeam />} />             
              <Route path="/topNavigation" element={<TopNavigation />} />            
              <Route path="/project/addProject" element={<AddProject/>}/>
              <Route path="/assignEmployee" element={<AssignEmployee/>}/>
              <Route path="/assignPM" element={<AssignPM/>}/>
              <Route path="/project/projectslist" element={<ProjectsList/>}/>
              <Route path="/creationDashboard" element={<CreationDashboard/>}/>
              <Route path="/addEmployee" element={<AssignPM/>}/>
            </>
          )}     
       
          {/*ProjectManager */}
          {TaskService.pmanagerOnly() && (
            <>
              <Route path="/:pmId/pmhome" element={<HomePM />} />
              <Route path="/topNavigationPM" element={<TopNavigationPM />} />
              <Route path="/sideNavigationPM" element={<SideNavigationPM />} />
              <Route path="/:pmId/project" element={<Projects />} />
              <Route path="/pmanager/dashboard" element={<ProjectDashboard />} />
              <Route path="/task/:taskId/job" element={<Jobs />} />
              <Route path="/projects/:projectId/tasks" element={<TasksForProject projectId={3} />}/>     
              <Route path="/projects/:projectId/tasks" element={<TasksForProject />}/>
              <Route path="/projects" element={<Projects />} />       
              <Route path="/tasks" element={<Tasks />} />      
              <Route path="/employees" element={<Employees />} />
              <Route path="/progress" element={<ProjectProgress />} />
              <Route path="/:projectId/employee-history" element={<EmployeeHistory />}/>          
              <Route path="/project/:projectId/dashboard" element={<ProjectDashboard />}/>
              <Route path="/project/:projectId/task" element={<TasksForProject />}/>         
              <Route path="/project/:projectId/employee" element={<Employees />} />
              <Route path="/project/:projectId/progress" element={<ProjectProgress />}/>   
            </>
          )}
          {TaskService.pmanageronlyOnly() && (
            <>
              <Route path="/:projectId/addtask" element={<AddTask />} />
              <Route path="/t/:projectId/edit-task/:taskId" element={<EditTask0 />}/>          
              <Route path=":projectId/edit-task/:taskId" element={<EditTask />} />  
              <Route path="/:projectId/addemployee" element={<AddEmployee />} />        
            </>
          )}

          {/*Deshani*/}
          {StoreServices.storeOnly() && (
            <>             
              <Route path="/tasks/:taskId/jobs" element={<Jobs />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/material" element={<Material />} /> 
              <Route path="/store/dashboard" element={<StoreKeeperDashboard />} />   
            </>
          )}
          {StoreServices.skeeperOnly() && (
            <>
              <Route path="/viewHistory" element={<ViewHistory />} />  
              <Route path="/history" element={<History />} />     
            </>
          )}
          {StoreServices.skeeperonlyOnly() && (
            <>          
              <Route path="/editMaterial/:id" element = {<MaterialForm/>}/>             
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

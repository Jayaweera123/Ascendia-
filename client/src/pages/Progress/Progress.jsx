import React, { useState, useEffect } from "react";
import axios from "axios";  
import { jwtDecode } from 'jwt-decode';
import SideNavigationClient from "../../components/Client/SideNavigationClient"; 
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import SideNavigationStore from "../../components/Store/SideNavigationStore"; 
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import progresspark from "../../assets/progresspark.png";
import { GiProgression } from "react-icons/gi";
import RadialProgressBar1 from "../../components/Progress/RadialProgressBar1";
import RadialProgressBar2 from "../../components/Progress/RadialProgressBar2";
import RadialProgressBar3 from "../../components/Progress/RadialProgressBar3";
import RadialProgressBar4 from "../../components/Progress/RadialProgressBar4";
import RadialProgressBar5 from "../../components/Progress/RadialProgressBar5";
import UserService from "../../services/UserService";

const Progress = () => {
  const [open, setOpen] = useState(true);

  const [designation, setDesignation] = useState('');

  useEffect(() => {
    const userDesignation = UserService.getDesignation();
    setDesignation(userDesignation);
  }, []);

  const renderSideNavigation = () => {
    switch (designation) {
      case 'Store Keeper':
      case 'Quantity Surveyor':
        return <SideNavigationStore open={open} setOpen={setOpen} />;
      case 'Project Manager':
        return <SideNavigationPM open={open} setOpen={setOpen} />;
      case 'Project Creation Team':
        return <SideNavigationPCTeam open={open} setOpen={setOpen} />;
      default:
        return <SideNavigationClient open={open} setOpen={setOpen} />;
    }
  };


  const [project, setProject] = useState({
    projectId: '',
    projectName: '',
    projectType: '',
    projectDescription: '',
    projectStatus: '',
    createdDate: '',
    endDate: '',
    image: '',
    progress: 0
  });

  const [tasks, setTasks] = useState([{ taskId: 0, taskName: 'Closure of the building site', progress: 0 }]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const projectIds = decodedToken.projectIDs;
      
      if (projectIds && projectIds.length > 0) {
        const projectId = projectIds[0]; // Assuming you want the first project ID

        const fetchProjectData = async () => {
          try {
            const projectResponse = await axios.get(`http://localhost:8080/progress/${projectId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setProject(projectResponse.data);

            const tasksResponse = await axios.get(`http://localhost:8080/progress/${projectId}/taskprogress`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setTasks(tasksResponse.data);
          } catch (error) {
            console.error("Error fetching project or task data", error);
          }
        };

        fetchProjectData();
      }
    }
  }, []);

  return (
    <div>
      <TopNavigationClient />
      <section className="flex">
        {renderSideNavigation()}
        <div class="relative bg-sky-50 bg-cover h-fit w-screen">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <div className="flex flex-row gap-3 pt-2 pb-1 ml-3 items-centered">
        <GiProgression  size={80} color="#001b5e"/>
            
          <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 tracking-tight font-bold text-left text-[#001b5e]">Progress</h1></div>
        </div>

        <div className="flex flex-col object-left w-auto gap-1 mt-2 ml-3 bg-white h-fit">
            <div className="flex flex-row gap-5 p-3 m-3 border-2 border-dotted rounded-lg border-gray-900/10">
                <div className="flex flex-col justify-center object-left gap-5 items-left">
                    <h1 className="top-0 left-0 text-3xl font-bold leading-9 tracking-tight text-left text-gray-900">
                        Project ID - {project.projectId || 105}
                    </h1>
                    <h2 className="font-sans text-2xl font-semibold leading-9 tracking-tight text-left text-gray-500">
                      {project.projectName || "The Galle Techno-Park" }
                    </h2>
                    <div className="text-base text-justify">
                      {project.projectDescription || "The Galle Techno-Park is located in the Galle District, close to the Southern Expressway Pinnaduwa interchange. Construction of the complex was envisioned by the Ministry of Information Technology in line with the National Policy Framework and the President’s vision."}
                    </div>

                </div>
                <img
                  src={project.image || progresspark}
                  alt="park"
                  className="object-right w-6/12 pt-1 shadow-sm h-1/2 shadow-white"
                />
        
            </div>

            <div className="flex flex-col gap-3 p-3 m-3 border-2 border-dotted rounded-lg border-gray-900/10">
                <h1 className="top-0 left-0 pt-3 text-3xl font-bold leading-9 tracking-tight text-left text-gray-900">
                  Progress : {new Date().toLocaleDateString()}
                </h1>
                {/* Radial Progress Component */}
                <div className="flex flex-row gap-5 p-3 m-3">
                    <div className="flex flex-col">
                    <RadialProgressBar1 progress={project.progress} />
                        <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                Project Progress
                        </h3>
                    </div>
                    {tasks.map(task => (
                    <div key={task.taskId} className="flex flex-col">
                      <RadialProgressBar2 progress={task.progress} />
                      <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                        {task.taskName || "Closure of the building site"}
                      </h3>
                    </div>
                  ))}
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Progress;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";  
import { jwtDecode } from 'jwt-decode';
import SideNavigationClient from "../../components/Client/SideNavigationClient"; 
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
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
import { format } from 'date-fns';

const Progress = () => {
  const { projectId: projectIdParam } = useParams();
  const [open, setOpen] = useState(true);
  const [designation, setDesignation] = useState('');
  const [projectProgress, setProjectProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState({
    projectId: '',
    projectName: '',
    endDate: '',
    projectDescription: '',
    profileImage: ''
  });

  const renderSideNavigation = () => {
    switch (designation) {
      case 'Store Keeper':
      case 'Quantity Surveyor':
        return <SideNavigationStore open={open} setOpen={setOpen} />;
      case 'Project Manager':
        return <SideNavigation open={open} setOpen={setOpen} />;
      case 'Project Creation Team':
        return <SideNavigationPCTeam open={open} setOpen={setOpen} />;
      default:
        return <SideNavigationClient open={open} setOpen={setOpen} />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    const userDesignation = UserService.getDesignation();
    setDesignation(userDesignation);

    const token = localStorage.getItem("token");
    let projectId = projectIdParam;
    if (!projectId && token) {
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token: ", decodedToken);

      const projectIds = decodedToken.projectIDs;
      console.log("Project IDs: ", projectIds);
      
      if (projectIds && projectIds.length > 0) {
        projectId = projectIds[0]; // Fallback to first project ID from token
      }
    }

    if (projectId) {
      console.log("Fetching data for Project ID: ", projectId);
        

  
        try {
          const projectResponse = await axios.get(`http://localhost:8080/progress/${projectId}/projectprogress`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProjectProgress(projectResponse.data);  // Ensure correct property
          console.log("Project progress:", projectResponse.data);
          
          const projectDetailsResponse = await axios.get(`http://localhost:8080/pmanager/${projectId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProject(projectDetailsResponse.data);
  
            // Fetch tasks
            const tasksResponse = await axios.get(`http://localhost:8080/sengineer/${projectId}/tasks`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const tasksData = tasksResponse.data;
  
            if (Array.isArray(tasksData)) {
              // Fetch task progress for each task
              const tasksWithProgress = await Promise.all(
                tasksData.map(async (task) => {
                  const taskProgressResponse = await axios.get(`http://localhost:8080/progress/${task.taskId}/taskprogress`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  return { ...task, progress: taskProgressResponse.data };
                })
              );
        
              setTasks(tasksWithProgress);
              console.log("Tasks with progress:", tasksWithProgress);
            } else {
              console.error("Expected tasksData to be an array", tasksData);

            }
          } catch (error) {
            console.error("Error fetching project or task data", error);
          }
        } else {
          console.error("No project ID found in params or token.");
        }
  
        
    };

    fetchData();
  }, [projectIdParam]);

  return (
    <div>
      <TopNavigationClient />
      <section className="flex">
        {renderSideNavigation()}
        <div class="relative bg-sky-50 bg-cover h-fit w-">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <div className="flex flex-row gap-3 pt-2 pb-1 ml-3 items-centered">
        
            
          <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 tracking-tight font-bold text-left text-[#001b5e]">Progress</h1></div>
        </div>

        <div className="flex flex-col object-left gap-1 mt-2 ml-3 bg-white h-fit w-screen rounded-lg shadow-md">
            <div className="flex flex-row gap-5 p-3 m-3 border-2 border-dotted rounded-lg border-gray-900/10">
                <div className="flex flex-col justify-center object-left gap-5 items-left">
                    <h1 className="top-0 left-0 text-3xl font-bold leading-9 tracking-tight text-left text-gray-900">
                        Project ID - {project.projectId || 105}
                    </h1>
                    <h2 className="font-sans text-2xl font-semibold leading-9 tracking-tight text-left text-gray-500">
                      {project.projectName || "The Galle Techno-Park" }
                    </h2>
                    <h2 className="font-sans text-lg font-semibold leading-9 tracking-tight text-left text-gray-900">
                    Completion Date - {project.endDate ? (
                      <time dateTime={project.endDate} className="text-gray-800 font-normal">
                        {format(new Date(project.endDate), 'PPP')}
                      </time>
                    ) : (
                      'December 31st, 2026'
                    )}
                  </h2>
                    <div className="text-base text-justify">
                      {project.projectDescription || "The Galle Techno-Park is located in the Galle District, close to the Southern Expressway Pinnaduwa interchange. Construction of the complex was envisioned by the Ministry of Information Technology in line with the National Policy Framework and the President’s vision."}
                    </div>

                </div>
                <img
                  src={project.profileImage || progresspark}
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
                    <div className="flex flex-col gap-3 p-3 m-3 border-2 rounded-lg border-gray-900/10">
                      <RadialProgressBar1 progress={projectProgress} />
                          <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                                  Project Progress
                          </h3>
                    </div>
                    <div>
                        <h2 className="font-sans text-2xl font-semibold leading-9 tracking-tight text-center text-gray-900">
                        {"Project Progress" }
                        </h2>
                    </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex gap-3 p-3 m-3 border-2 rounded-lg border-gray-900/10 overflow-x-auto w-7/12">                    
                        {tasks.map(task => (            
                        <div key={task.taskId} className="flex flex-col">
                          <RadialProgressBar2 progress={task.progress} />
                          <h3 className="text-base font-semibold tracking-tight text-center text-gray-900">
                            {task.taskName || "Closure of the building site"}
                          </h3>
                        </div>
                        ))}
                      
                      </div>
                      <div>                   
                        <h2 className="font-sans text-2xl font-semibold leading-9 tracking-tight text-center text-gray-900">
                          {"Tasks Progress" }
                        </h2>
                      </div>
                    </div>
                    
                
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
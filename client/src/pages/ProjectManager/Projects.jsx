import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import ProjectCard from "../../components/ProjectManager/ProjectCardCopy copy";
import { useParams } from "react-router-dom";

function Projects() {
  // const { pmId } = useParams();
  const [projects, setProjects] = useState([]);

  const [pmId, setPmId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (userId) {
      setPmId(userId);
    }
  }, []);

  /*useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`/api/projects/pm/${pmId}`); // Adjust URL to your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const projectsData = await response.json();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading projects:", error.message);
        // Handle error state or display a message to the user
      }
    };
    loadProjects();
  }, [pmId]);*/

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM pmId={pmId} />

        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            <PageTitle title="Projects" />
            {/*<ul>
              {projects.map((project) => (
                <li key={project.id}>{project.name}</li>
              ))}
            </ul>*/}

            <ProjectCard projectManagerId={pmId} />

            {/* Uncomment and adjust this section for linking to tasks page */}
            {/* <Link to="/projects/tasks">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tasks
              </button>
            </Link>{" "} */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Projects;

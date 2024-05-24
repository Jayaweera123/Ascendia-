import React from "react";
import { Link } from "react-router-dom";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import ProjectCard from "../../components/ProjectManager/ProjectCardCopy copy";
import { useParams } from "react-router-dom";

function Projects() {
  const { pmId } = useParams();

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM pmId={pmId} />
        <div>{pmId}</div>
        <div className="ml-3.5 mr-3.5 mt-10 w-9/12 flex-grow">
          <PageTitle title="Projects" />

          <ProjectCard projectManagerId={pmId} />

          {/*<Link to="/projects/tasks">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tasks
            </button>
          </Link>{" "}
  */}
        </div>
      </section>
    </>
  );
}

export default Projects;

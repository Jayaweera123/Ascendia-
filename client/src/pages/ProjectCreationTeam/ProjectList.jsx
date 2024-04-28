import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import ProjectCard from "../../components/ProjectManager/ProjectCard";
import { Link } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddProjectButton from "../../components/ProjectCreationTeam/AddProjectButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

function ProjectsList() {
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />
        <div className="ml-3.5 mt-10">
          <div></div>
          <div className="flex justify-between m-0">
            <PageTitle title="Projects" />
            <AddProjectButton />
          </div>

          <ProjectCard />
        </div>
      </section>
    </>
  );
}

export default ProjectsList;

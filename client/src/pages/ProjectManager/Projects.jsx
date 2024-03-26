import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigationPM";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";
import ProjectCard from "../../components/Nethuni/ProjectCard";

function Projects() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <div className="ml-3.5 mt-10">
          <PageTitle title="Projects" />
          <ProjectCard />
        </div>
      </section>
    </>
  );
}

export default Projects;

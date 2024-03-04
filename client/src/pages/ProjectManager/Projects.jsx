import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigationPM";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";

function Projects() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <PageTitle title="Projects" />
      </section>
    </>
  );
}

export default Projects;

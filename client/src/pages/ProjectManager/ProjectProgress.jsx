import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";

function ProjectProgress() {
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />
        <PageTitle title="Progress" />
      </section>
    </>
  );
}

export default ProjectProgress;

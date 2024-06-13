import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";

function ProjectDashboard() {
  const { projectId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            <PageTitle title="Dashboard" />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectDashboard;

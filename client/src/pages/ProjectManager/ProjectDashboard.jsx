import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";
import TotalNumbers from "../../components/ProjectManager/ProjectDashboard/TotalNumbers";
import TasksPieChart from "../../components/ProjectManager/ProjectDashboard/TasksPieChart";
import TasksBarChart from "../../components/ProjectManager/ProjectDashboard/TasksBarChart";

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

            <TotalNumbers projectId={projectId} />
            <div className="lg:flex grow gap-5 md:flex:none">
              <div className="lg:w-8/12 py-5">
                <TasksBarChart projectId={projectId} />
              </div>

              <div className="lg:w-4/12 py-5">
                <TasksPieChart projectId={projectId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectDashboard;

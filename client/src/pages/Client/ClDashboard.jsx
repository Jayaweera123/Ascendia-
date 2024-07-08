import React from "react";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";
import TotalNumbers from "../../components/ProjectManager/ProjectDashboard/TotalNumbers";
import TasksPieChart from "../../components/ProjectManager/ProjectDashboard/TasksPieChart";
import TasksBarChart from "../../components/ProjectManager/ProjectDashboard/TasksBarChart";
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import SideNavigationClient from "../../components/Client/SideNavigationClient";
import { jwtDecode } from 'jwt-decode';

function ClDashboard() {
  const [projectId, setProjectId] = useState(null);
  return (
    <>
      <TopNavigationClient />
      <section className="flex">
        <SideNavigationClient projectId={projectId} />
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

export default ClDashboard;

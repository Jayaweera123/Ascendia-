import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";
import GanttChart from "../../components/ProjectManager/GanttChart";
function ProjectProgress() {
  const data = [
    { id: 1, name: "Task 1", start: "2024-06-01", end: "2024-06-10" },
    { id: 2, name: "Task 2", start: "2024-06-05", end: "2024-06-15" },
    // Add more tasks as needed
  ];

  const { projectId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <PageTitle title="Progress" />

        <div className="App">
          <h1>Gantt Chart Example</h1>
          <GanttChart data={data} />
        </div>
      </section>
    </>
  );
}

export default ProjectProgress;

import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { useParams } from "react-router-dom";

function Jobs() {
  const { taskId } = useParams();
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <div className="ml-3.5 mt-10">
          <div></div>
          <div className="flex justify-between m-0">
            <PageTitle title="Jobs" />
          </div>

          <JobCard taskId={taskId} />
        </div>
      </section>
    </>
  );
}

export default Jobs;

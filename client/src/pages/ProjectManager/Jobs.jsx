import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigation";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";
import JobCard from "../../components/Nethuni/JobCard";
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

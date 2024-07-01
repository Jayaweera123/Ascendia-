import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { getTask } from "../../services/TaskService";
import JobCard from "../../components/ProjectManager/JobCard";
import { IoIosArrowForward } from "react-icons/io";

function JobList() {
  const { taskId } = useParams();
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    getTask(taskId)
      .then((response) => {
        console.log(response.data);
        setProjectId(response.data.project.projectId); // Set the project data
        // console.log({ projectId });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            <div className="flex justify-between">
              <div className="flex">
                <PageTitle title="Task" />
                <IoIosArrowForward className="my-auto mx-2 text-3xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap" />
                <PageTitle title="Job List" />
              </div>
            </div>
            <div className="flex-grow">
              <JobCard taskId={taskId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobList;

import React, { useState, useEffect } from "react";

import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { useParams } from "react-router-dom";
import { getTask } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";
import TaskDetails from "../../components/ProjectManager/TaskDetailsinJobPage";
import BreadCrumb from "../../components/ProjectManager/BreadCrumb";

function Jobs() {
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

  useEffect(() => {
    if (projectId !== null) {
      console.log({ projectId });
    }
  }, [projectId]);

  /*useEffect(() => {
    const logProjectId = async () => {
      if (projectId !== null) {
        try {
          await console.log({ projectId });
        } catch (error) {
          console.error(error);
        }
      }
    };

    logProjectId();
  }, [projectId]);*/

  return (
    <>
      <TopNavigationPM />
      <section className="flex ">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            {/*<BreadCrumb previousPage={"Tasks"} currentPage={"Jobs"} />*/}
            <div className="flex">
              <div className="h-screen">
                <PageTitle title="Tasks" />

                <TaskDetails taskId={taskId} />
              </div>
            </div>
            <div className="">
              <div className="flex-grow">
                <PageTitle title="Jobs" />
                <JobCard taskId={taskId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;

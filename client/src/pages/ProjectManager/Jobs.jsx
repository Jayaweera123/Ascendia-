import React, { useState, useEffect } from "react";

import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { useParams } from "react-router-dom";
import { getTask } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";
import TaskDetails from "../../components/ProjectManager/TaskDetailsinJobPage";

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
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="ml-3.5 mr-3.5 mt-10 w-9/12 flex-grow">
          <div className="flex">
            <PageTitle title="Jobs" />
          </div>
          <TaskDetails taskId={taskId} />
          <div className="ml-3.5">
            <div className="flex-grow">
              <JobCard taskId={taskId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;

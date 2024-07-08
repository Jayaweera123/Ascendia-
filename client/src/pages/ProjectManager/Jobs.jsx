import React, { useState, useEffect, useRef } from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTask, getJobCountForTask } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";
import TaskDetails from "../../components/ProjectManager/TaskDetailsinJobPage";
import BreadCrumb from "../../components/ProjectManager/BreadCrumb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Correct import
import GoToJob from "../../components/ProjectManager/GoToJob";
import MarkAsCompleted from "../../components/ProjectManager/MarkAsCompleted";

function Jobs() {
  const { taskId } = useParams();
  const [jobCount, setJobCount] = useState();

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

  useEffect(() => {
    getJobCountForTask(taskId)
      .then((response) => {
        setJobCount(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  return (
    <>
      <TopNavigationPM />
      <section className="flex mt-16">
        <SideNavigationPM projectId={projectId} />

        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            {/*<BreadCrumb previousPage={"Tasks"} currentPage={"Jobs"} />*/}
            <div className="">
              <div className="flex justify-between">
                <PageTitle title="Task" />
                {jobCount > 0 ? (
                  <div className="mt-3.5">
                    <GoToJob taskId={taskId} />
                  </div>
                ) : (
                  <div className="mt-3.5 opacity-60">
                    <GoToJob taskId={taskId} />
                  </div>
                )}
              </div>
              <TaskDetails taskId={taskId} projectId={projectId} />{" "}
            </div>
            <MarkAsCompleted taskId={taskId} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;

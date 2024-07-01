import React, { useState, useEffect, useRef } from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTask } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";
import TaskDetails from "../../components/ProjectManager/TaskDetailsinJobPage";
import BreadCrumb from "../../components/ProjectManager/BreadCrumb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Correct import
import GoToJob from "../../components/ProjectManager/GoToJob";

function Jobs() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [projectId, setProjectId] = useState(null);
  const jobsRef = useRef(null);

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

  const scrollToJobs = () => {
    if (jobsRef.current) {
      jobsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToJobList = () => {
    navigate(`task/${taskId}/joblist`);
  };

  return (
    <>
      <TopNavigationPM />
      <section className="flex ">
        <SideNavigationPM projectId={projectId} />

        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            {/*<BreadCrumb previousPage={"Tasks"} currentPage={"Jobs"} />*/}
            <div className="flex">
              <div className="">
                <PageTitle title="Task" />
                <TaskDetails taskId={taskId} projectId={projectId} />{" "}
              </div>
            </div>
            <div className="flex justify-end">
              <GoToJob taskId={taskId} />
            </div>

            {/*<div className="flex justify-center mt-5 text-5xl">
              <IoIosArrowDown onClick={scrollToJobs} />
            </div>

            <div ref={jobsRef} className="mt-10">
              {" "}
              <PageTitle title="Jobs" />
              <JobCard taskId={taskId} />
            </div>

            <div className="flex justify-center mt-5 text-5xl">
              <IoIosArrowUp onClick={scrollToTop} />
            </div>*/}
            <div ref={jobsRef} className="mt-10"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;

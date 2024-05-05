import React, { useState, useEffect } from "react";

import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import JobCard from "../../components/ProjectManager/JobCard";
import { useParams } from "react-router-dom";
import { getTask } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";

function Jobs() {
  const { taskId } = useParams();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Call Taskdetails function when component mounts
    Taskdetails(taskId);
  }, [taskId]); // Execute effect whenever taskId changes

  function Taskdetails(taskId) {
    getTask(taskId)
      .then((response) => {
        console.log(response.data); // Log the response data to the console
        // If you want to update state with the response data, you can do it here
        // For example:
        setTaskName(response.data.taskName);
        setDescription(response.data.description);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />
        <div className="ml-3.5  mrml-3.5 mr-3.5 mt-10 w-9/12 flex-grow ">
          <div className="flex">
            <PageTitle title="Jobs" />
          </div>

          <div className="ml-7 mt-5">
            <div className="w-11/12 mb-5">
              <h2 className="text-xl font-semibold">{taskName}</h2>
              <p className="text-gray-600 mt-1">{description}</p>
              <div className="relative">
                <div className="absolute top-0 left-0">{startDate}</div>
                <div className="absolute top-0 right-0">{endDate}</div>
              </div>
            </div>
            <div className="">
              <JobCard taskId={taskId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Jobs;

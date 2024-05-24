import React, { useState, useEffect } from "react";

import { getTask, getTimeBetween } from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";

const TaskDetailsinJobPage = ({ taskId }) => {
  // Your component logic goes here
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [project, setProject] = useState("");
  const [timeDifference, setTimeDifference] = useState({});
  const [isEndDateGreaterThanCurrentDate, setIsEndDateGreaterThanCurrentDate] =
    useState(false);

  useEffect(() => {
    if (endDate) {
      const endDateObj = new Date(endDate);
      const currentDate = new Date();
      setIsEndDateGreaterThanCurrentDate(endDateObj > currentDate);
    }
  }, [endDate]);

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
        setProject(response.data.project.projectName); // Set the project data
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // Fetch time difference when taskId changes
    getTimeBetween(taskId)
      .then((response) => {
        setTimeDifference(response.data); // Update the state with the response data
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]); // Add taskId to the dependency array

  return (
    // Your JSX code goes here
    <div className="bg-white shadow-md rounded-md">
      {/* Component content */}

      <div className="w-11/12 mb-5">
        <h2 className="text-xl font-semibold">
          {project}
          {IoIosArrowForward}
          {taskName}
        </h2>
        <p className="text-gray-600 mt-1">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p>{startDate}</p>
            <p>{endDate}</p>
          </div>
          <div className="ml-auto">
            {endDate}
            {isEndDateGreaterThanCurrentDate ? (
              <div className="ml-auto text-green-800">
                {JSON.stringify(timeDifference).replace(/"/g, "")}
              </div>
            ) : (
              <div className="ml-auto text-red-800">
                {JSON.stringify(timeDifference).replace(/"/g, "")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsinJobPage;

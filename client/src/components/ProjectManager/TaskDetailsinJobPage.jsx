import React, { useState, useEffect } from "react";

import {
  getTask,
  getTimeBetween,
  markAsCompleted,
  getJobCountForTask,
  deleteTask,
  getCommetsForTask,
} from "../../services/TaskService";
import { IoIosArrowForward } from "react-icons/io";
import { LuClipboardEdit, LuCalendarClock } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { comment } from "postcss";
import CommentCard from "./CommentCard"; // Import the CommentCard component
import { formatDate } from "./Functions"; // Import the formatDate function
import { FaArrowRight } from "react-icons/fa";
import EditHistoy from "./EditHistory";

const TaskDetailsinJobPage = ({ taskId, projectId }) => {
  // Your component logic goes here
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [project, setProject] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [iscompleted, setCompleted] = useState(false);
  const [timeDifference, setTimeDifference] = useState({});
  const [jobCounts, setJobCounts] = useState({});
  //const [projectId, setProjectId] = useState({});
  const [comments, setComments] = useState([]);

  const [isEndDateGreaterThanCurrentDate, setIsEndDateGreaterThanCurrentDate] =
    useState(false);

  const navigator = useNavigate();

  const navigateToJobList = () => {
    navigator(`task/${taskId}/joblist`);
  };

  const location = useLocation();

  const previousPage = location.state ? location.state.previousPage : "";

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
        setTaskStatus(response.data.status);
        //setProjectId(response.data.project.projectId);
        setCompleted(response.data.completed);
        //setTimeDifference(response.data);
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

  useEffect(() => {
    getCommetsForTask(taskId)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  useEffect(() => {
    // Fetch job counts for each task
    getJobCountForTask(taskId)
      .then((response) => {
        setJobCounts((prevCounts) => ({
          ...prevCounts,
          [taskId]: response.data, // Store job count for the task
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]); // Trigger effect when tasks change

  //======pop ups===========

  // Check if job count is greater than 0
  function noDeleteWarning(id) {
    Swal.fire({
      icon: "warning",
      title: "Unable to delete",
      text: "This task has associated jobs.",
      confirmButtonColor: "#001b5e",
    });
    return; // Exit function
  }

  // If job count is 0, show confirmation dialog
  function removeTask(id) {
    deleteTask(taskId)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Task deleted successfully!",
          confirmButtonColor: "#001b5e",
        }).then(() => {
          navigator("/project/" + projectId + "/task");
        });
        // After deleting, fetch tasks again
        //getTasksForProject(projectId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function popUpWarning(id) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure? This action Cannot be undone.",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "OK", call removeTask function
        removeTask(taskId);
      } else {
        // If the user clicks "Cancel" or closes the modal without confirming, do nothing
        console.log("Task deletion canceled");
      }
    });
  }

  return (
    <>
      <div className="mt-2.5 mb-5 p-5 bg-white shadow-md rounded-md ">
        <div className="flex justify-between  w-full">
          {/*Title */}
          <div className="flex text-xl font-semibold mb-2 text-gray-700">
            {project}
            <IoIosArrowForward className="mt-1.5" />
            {taskName}
          </div>

          <div className="flex">
            {/*Status */}

            <div
              className={`flex items-center font-semibold  bg-indigo-100 text-indigo-500 rounded-md mr-1 pl-1 pr-1 mb-2 mt-1 py-0 status-label-${taskStatus.toLowerCase()}`}
            >
              {taskStatus}
            </div>

            {/*Edit and Delete buttons */}
            <div className="flex mt-2">
              <Link
                to={`/${projectId}/edit-task/${taskId}`}
                className="group ml-1"
              >
                <LuClipboardEdit className="text-slate-600 text-lg transition-transform duration-300 transform hover:scale-150" />
              </Link>

              <RiDeleteBin6Line
                className="text-slate-600 text-lg cursor-pointer transition-transform duration-300 transform hover:scale-150"
                onClick={() => {
                  const jobCount = jobCounts[taskId];
                  if (jobCount > 0 /* condition for the first function */) {
                    // Execute the first function
                    noDeleteWarning(taskId);
                  } else {
                    popUpWarning(taskId);
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-justify">
          <p className="text-gray-800 mt-1">
            {description.length < 700
              ? description +
                Array(700 - description.length)
                  .fill("\u00A0")
                  .join(" ")
              : description + Array(100).fill("\u00A0").join(" ")}
            {/* Add whitespace if shorter */}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="flex flex-col   text-gray-700">
              {startDate && <p>Scheduled To: {formatDate(startDate)}</p>}
              <p>Due on: {formatDate(endDate)}</p>
            </div>

            {/*Edit Hisory */}
            <div className="flex">
              <EditHistoy taskId={taskId} />
            </div>
          </div>
          <div className="ml-auto">
            {iscompleted ? (
              <div
                className="ml-auto font-semibold"
                style={{ color: "#239B56" }}
              ></div>
            ) : isEndDateGreaterThanCurrentDate ? (
              <div
                className="ml-auto font-semibold"
                style={{ color: "#239B56" }}
              >
                {JSON.stringify(timeDifference).replace(/"/g, "")} remaining
              </div>
            ) : (
              <div
                className="ml-auto font-semibold"
                style={{ color: "#E75538" }}
              >
                overdue by {JSON.stringify(timeDifference).replace(/"/g, "")}
              </div>
            )}

            {/* Render the comment cards */}
            <div className="mt-1  text-gray-700 font-semibold">
              <CommentCard comments={comments} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
    .status-label-completed {
      background-color: #D5F5E3 ; /* Green color for completed Tasks */
      color: #239B56  ;
      fit-content: 1;
    }
  
  .status-label-overdue {
    background-color: #FFE7E2; /* Red color for overdue Tasks */
    color: #E75538;
    fit-content: 1;
    }
  
    .status-label-in-progress {
      background-color: #FFFEC7; /* Yellow color for upcoming projects */
      color: #EEAF32;
      fit-content: 1;
    }
      `}</style>
    </>
  );
};

export default TaskDetailsinJobPage;

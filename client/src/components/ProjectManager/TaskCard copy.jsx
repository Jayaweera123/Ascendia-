import React, { useEffect, useState } from "react";
import {
  deleteTask,
  getTasksForProject,
  getJobCountForTask,
  setStatusLabel,
  searchTask,
} from "../../services/TaskService.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LuClipboardEdit, LuCalendarClock } from "react-icons/lu";

import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import SearchBar from "../../components/ProjectManager/SearchBar";
import AddButton from "../../components/ProjectManager/AddButton";

import AddEmployeeButton from "./AddEmployeeButton";

const TaskCardforProject = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [taskStatus, setTaskStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedTasks, setExpandedTasks] = useState({});

  const handleSeeMoreClick = (taskId) => {
    setExpandedTasks((prevExpandedTasks) => ({
      ...prevExpandedTasks,
      [taskId]: !prevExpandedTasks[taskId],
    }));
  };

  const navigator = useNavigate();
  //const { projectId } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    // Fetch tasks for the project when projectId changes
    getTasksForProject(projectId)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  /*useEffect(() => {
    const updateStatusLabels = async () => {
      try {
        const updatedTasks = await Promise.all(
          tasks.map(async (task) => {
            const response = await setStatusLabel(task.taskId);
            console.log("Status Label Updated: ", response.data);
            return {
              ...task,
              status: response.data, // Assuming response.data contains the status label
            };
          })
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    updateStatusLabels();
  }, [tasks]);*/

  /*useEffect(() => {
    tasks.forEach((task) => {
      setStatusLabel(task.taskId)
        .then((response) => {
          console.log("Status Label Updated: ", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [tasks]);*/

  useEffect(() => {
    // Fetch status for each task
    tasks.forEach((task) => {
      setStatusLabel(task.taskId)
        .then((response) => {
          setTaskStatus((prevTaskStatus) => ({
            ...prevTaskStatus,
            [task.taskId]: response.data, // Store status for the task
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [tasks]); // Trigger effect when tasks change*/

  useEffect(() => {
    // Fetch job counts for each task
    tasks.forEach((task) => {
      getJobCountForTask(task.taskId)
        .then((response) => {
          setJobCounts((prevCounts) => ({
            ...prevCounts,
            [task.taskId]: response.data, // Store job count for the task
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [tasks]); // Trigger effect when tasks change

  // Check if job count is greater than 0
  function noDeleteWarning(id) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "You cannot delete this task because it has associated jobs.",
    });
    return; // Exit function
  }

  // If job count is 0, show confirmation dialog
  function removeTask(id) {
    deleteTask(id)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Task deleted successfully!",
        }).then(() => {
          // Update the tasks list to remove the deleted task
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.taskId !== id)
          );
          // Navigate to the task list after successful deletion
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
    })
      .then((result) => {
        if (result.isConfirmed) {
          // If the user clicks "OK", call removeTask function
          removeTask(id);
        } else {
          // If the user clicks "Cancel" or closes the modal without confirming, do nothing
          console.log("Task deletion canceled");
        }
      })
      .then(() => {
        navigator("/project/" + projectId + "/task");
      });
  }

  //Search task
  useEffect(() => {
    if (search !== "") {
      searchTask(projectId, search)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      //if search is empty fetch all equipment
      getTasksForProject(projectId)
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [search]);

  //sort according to the status
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredTasks =
    selectedStatus === "all"
      ? tasks
      : tasks.filter((task) => taskStatus[task.taskId] === selectedStatus);

  return (
    <>
      <div className="">
        <main className="">
          <div className="">
            <div className="flex items-center justify-between pb-6 mt-2.5">
              <SearchBar search={search} setSearch={setSearch} />

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    className="border border-[#101D3F] text-[#101D3F] font-bold py-2 px-4 rounded-md flex items-center"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="all">All</option>
                    <option value="Overdue">Overdue</option>
                    <option value="In-Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                <AddButton projectId={projectId} />
              </div>
            </div>
            {/* Mapping task cards to a grid */}
            <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
              {filteredTasks.length === 0 ? (
                <p className="py-1 sm:py-2 text-center text-gray-500">
                  <em>No tasks yet for this project. </em>
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.taskId}
                    className="mb-6 rounded-lg bg-white shadow-md task-card "
                  >
                    <div className="pb-6 pl-6 pr-6 pt-2">
                      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
                        <div className="flex items-center w-1/2">
                          <div className="task-name-container">
                            <Link
                              key={task.taskId}
                              to={`/task/${task.taskId}/job`}
                            >
                              <h3 className="text-lg font-semibold text-gray-700 task-name cursor-pointer">
                                {task.taskName}
                              </h3>
                            </Link>
                          </div>
                        </div>
                        <div className="flex justify-end pt-1.5">
                          <div className="text-sm font-medium">
                            <div
                              className={`bg-indigo-100 text-indigo-500 rounded-md mr-1 pl-1 pr-1 ${
                                taskStatus[task.taskId]
                                  ? `status-label-${taskStatus[
                                      task.taskId
                                    ].toLowerCase()}`
                                  : ""
                              }`}
                            >
                              {taskStatus[task.taskId]}
                              {/*{task.status}*/}
                            </div>
                          </div>
                          <div className="flex">
                            <Link
                              to={`/t/${task.project.projectId}/edit-task/${task.taskId}`}
                              className="group"
                            >
                              <LuClipboardEdit className="text-slate-600 transition-transform duration-300 transform hover:scale-150" />
                            </Link>

                            <RiDeleteBin6Line
                              className="text-slate-600 cursor-pointer transition-transform duration-300 transform hover:scale-150"
                              onClick={() => {
                                const jobCount = jobCounts[task.taskId];
                                if (
                                  jobCount >
                                  0 /* condition for the first function */
                                ) {
                                  // Execute the first function
                                  noDeleteWarning(task.taskId);
                                } else {
                                  popUpWarning(task.taskId);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Link key={task.taskId} to={`/task/${task.taskId}/job`}>
                        <div className="task-description-container  pt-3 min-h-28">
                          <div className="text-sm font-normal text-gray-500 task-description">
                            {expandedTasks[task.taskId]
                              ? task.description
                              : task.description.length > 170
                              ? `${task.description.slice(0, 170)}...`
                              : task.description}

                            {task.description.length > 170 && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSeeMoreClick(task.taskId);
                                }}
                                className="text-indigo-500 hover:underline ml-1"
                              >
                                {expandedTasks[task.taskId]
                                  ? "See less"
                                  : "See more"}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm font-semibold mb-0">
                          <div className="flex">
                            <span className="mr-1">
                              {jobCounts[task.taskId]}
                            </span>{" "}
                            Jobs
                          </div>
                          <div className="flex items-center text-red-500">
                            {/*formatDate(task.endDate)*/}
                            {taskStatus[task.taskId] !== "Completed" && (
                              <div className="flex items-center text-red-500">
                                <LuCalendarClock className="mr-1 text-lg" />
                                {formatDate(task.endDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Style tag for embedding CSS */}
      <style>{`
.task-card {
    height: fit-content;
    }
.status-label-completed {
    background-color: #D5F5E3 ; /* Green color for completed Tasks */
    color: #239B56  ;
  }

.status-label-overdue {
  background-color: #FFE7E2; /* Red color for overdue Tasks */
  color: #E75538;
  }

  .status-label-in-progress {
    background-color: #FFFEC7; /* Yellow color for upcoming projects */
    color: #EEAF32;
  }

  .task-name-container {
    max-height: calc(10 * 0.9em); /* 2 lines * line-height */
    overflow: hidden;
    position: relative;
  }

.task-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: white-space 1.5s; /* Smooth transition for white-space change */

    /* Additional styles for hover */
    &:hover {
      white-space: normal; /* Make overflowing text visible when hovered */
    }
    
`}</style>
    </>
  );
};

export default TaskCardforProject;

import React, { useEffect, useState } from "react";
import {
  deleteTask,
  getTasksForProject,
  getJobCountForTask,
} from "../../services/TaskService.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LuClipboardEdit, LuCalendarClock } from "react-icons/lu";
import DeleteModal from "./DeleteModal.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const TaskCardforProject = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [jobCounts, setJobCounts] = useState({});

  const navigator = useNavigate();
  //const { projectId } = useParams();

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
          navigator("/project/" + projectId + "/task");
        });
        // After deleting, fetch tasks again
        getTasksForProject(projectId);
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

  return (
    <>
      <div className="mt-10 mx-auto">
        <main className="">
          <div className="px-4">
            <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
              {tasks.map((task) => (
                <Link key={task.taskId} to={`/task/${task.taskId}/job`}>
                  <div
                    key={task.taskId}
                    className="mb-6 rounded-lg bg-white shadow-md task-card "
                  >
                    <div className="pb-6 pl-6 pr-6 pt-2">
                      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
                        <div className="flex items-center w-1/2">
                          <div class="task-name-container">
                            <h3 class="text-lg font-semibold text-gray-700 task-name">
                              {/*{task.taskName.length >= 14
                                ? task.taskName.substring(0, 14) + "..." // truncate if longer
                                : task.taskName}*/}
                              {task.taskName}
                            </h3>
                          </div>
                        </div>
                        <div className="flex justify-end pt-1.5">
                          <p className="text-sm font-medium">
                            <div
                              className={`bg-indigo-100 text-indigo-500 rounded-md mr-1 pl-1 pr-1 status-label-${task.status.toLowerCase()}`}
                            >
                              {task.status}
                            </div>
                          </p>
                          <div className="flex">
                            <Link to={`/edit-task/${task.taskId}`}>
                              <LuClipboardEdit className="text-slate-600" />
                            </Link>

                            <RiDeleteBin6Line
                              className="text-slate-600"
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
                      <div className="">
                        <p className="my-6 text-sm font-normal text-gray-500">
                          {task.description.length >= 130
                            ? task.description.substring(0, 130) + "..." // truncate if longer
                            : task.description +
                              Array(130 - task.description.length)
                                .fill("\u00A0")
                                .join(" ")}
                          {/* Add whitespace if shorter */}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between text-sm font-semibold mb-0">
                        <div className="flex">
                          <span className="mr-1">{jobCounts[task.taskId]}</span>{" "}
                          Jobs
                        </div>
                        <div className="flex items-center text-red-500">
                          <LuCalendarClock className="mr-2 text-lg" />
                          {task.endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
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
    background-color: #34d399; /* Green color for completed projects */
    color: #ffffff;
  }

.status-label-overdue {
  background-color: #FFE7E2; /* Red color for overdue projects */
  color: #E75538;
  }

  .status-label-in-progress {
    background-color: #FFFEC7; /* Yellow color for upcoming projects */
    color: #EEAF32;
  }

  .task-name-container {
    max-height: calc(2 * 0.9em); /* 2 lines * line-height */
    overflow: hidden;
    position: relative;
}

.task-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

`}</style>
    </>
  );
};

export default TaskCardforProject;

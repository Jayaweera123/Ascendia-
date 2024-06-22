import React, { useEffect, useState } from "react";
//import { deleteTask, getAllTaskCards } from "../../services/TaskService.jsx";
import { Link, useParams } from "react-router-dom";
import { LuClipboardEdit } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";

const TaskCard = () => {
  // Define dummy data using useState hook
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  function getAllTasks() {
    getAllTaskCards()
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeTask(id) {
    console.log(id);

    deleteTask(id)
      .then((response) => {
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="mt-10">
        <div className="mx-auto">
          <main className="">
            <div className="px-4">
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 max-w-4xl">
                {tasks.map((task) => (
                  <Link key={task.taskId} to={`/tasks/${task.taskId}/jobs`}>
                    <div
                      key={task.taskId}
                      className="mb-6 rounded-lg bg-white  shadow-lg task-card"
                    >
                      <div className="pb-6 pl-6 pr-6 pt-2">
                        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
                          <div className="flex items-center w-1/2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700">
                                {task.taskName}
                              </h3>
                            </div>
                          </div>
                          <div className="flex justify-end pt-1.5">
                            <p className="text-sm font-medium">
                              <div
                                className={`bg-indigo-100  text-indigo-500 rounded-md mr-1 pl-1 pr-1 status-label-${task.status.toLowerCase()}`}
                              >
                                {task.status}
                              </div>
                            </p>

                            <div className=" flex">
                              <Link to={`/edit-task/${task.taskId}`}>
                                <LuClipboardEdit className="text-slate-600" />
                              </Link>
                              {/*<div onClick={() => removeTask(task.taskId)}>
                              <RiDeleteBin6Line className="text-slate-600" />
                </div>*/}
                              <DeleteModal
                                onDelete={() => removeTask(task.taskId)}
                                itemName={task.taskName}
                                itemType="Task"
                              />
                              {/* <DeletePopUp task={task} /> */}
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="my-6 text-sm font-normal text-gray-500">
                            {task.description}
                          </p>
                        </div>
                        <div class="mt-6 flex items-center justify-between text-sm font-semibold mb-0">
                          <div class="flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="mr-2 h-5 w-5 text-base text-gray-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                              />
                            </svg>
                            <span class="mr-1">40</span> Jobs
                          </div>
                          <div className="flex">
                            <div class="flex items-center text-red-500">
                              <LuCalendarClock className="mr-2 text-lg" />
                              {task.endDate}
                            </div>
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
          background-color: #ff0000; /* Red color for overdue projects */
          color: #ffffff;
          }
  
          .status-label-ongoing {
              background-color: #60a5fa; /* Blue color for ongoing projects */
  
            color: #ffffff;
          }
  
          .status-label-upcoming {
            background-color: #fcd34d; /* Yellow color for upcoming projects */
            color: #ffffff;
          }
      `}</style>
    </>
  );
};

export default TaskCard;

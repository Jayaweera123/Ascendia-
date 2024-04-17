import React, { useEffect, useState } from "react";
import { deleteTask, getTasksForProject } from "../../services/TaskService.jsx";
import { Link, useParams } from "react-router-dom";
import { LuClipboardEdit, LuCalendarClock } from "react-icons/lu";
import DeleteModal from "./DeleteModal.jsx";

const TaskCardforProject = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  //const { projectId } = useParams(); // Destructure projectId from useParams
  //const projectId = projectId ;

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

  function removeTask(id) {
    deleteTask(id)
      .then(() => {
        // After deleting, fetch tasks again
        getTasksForProject(projectId);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="mt-10 mx-auto">
      <main className="">
        <div className="px-4">
          <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 max-w-4xl">
            {tasks.map((task) => (
              <div
                key={task.taskId}
                className="mb-6 rounded-lg bg-white shadow-lg task-card"
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
                          className={`bg-indigo-100 text-indigo-500 rounded-md mr-1 pl-1 pr-1 status-label-${task.status.toLowerCase()}`}
                        >
                          {task.status}
                        </div>
                      </p>
                      <div className="flex">
                        <Link to={`/edit-task/${task.taskId}`}>
                          <LuClipboardEdit className="text-slate-600" />
                        </Link>
                        <DeleteModal
                          onDelete={() => removeTask(task.taskId)}
                          itemName={task.taskName}
                          itemType="Task"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="my-6 text-sm font-normal text-gray-500">
                      {task.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold mb-0">
                    <div className="flex">
                      <span className="mr-1">40</span> Jobs
                    </div>
                    <div className="flex items-center text-red-500">
                      <LuCalendarClock className="mr-2 text-lg" />
                      {task.endDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskCardforProject;

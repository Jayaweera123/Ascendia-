import React, { useEffect, useState } from "react";
import { deleteTask, getTasksForProject } from "../../services/TaskService.jsx";
import { Link, useParams } from "react-router-dom";
import { LuClipboardEdit, LuCalendarClock } from "react-icons/lu";
import DeleteModal from "./DeleteModal.jsx";

const TaskCardforProject = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  //const { projectId } = useParams(); // Destructure projectId from useParams
  //const projectId = projectId;
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
    <div className="mx-auto mt-10">
      {/* JSX code for rendering tasks */}
    </div>
  );
};
export default TaskCardforProject;

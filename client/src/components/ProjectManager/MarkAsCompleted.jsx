import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  markAsDone,
  markAsUndone,
  getTask,
} from "../../services/TaskService.jsx";
import { TiTick } from "react-icons/ti";

const MarkAsCompleted = ({ taskId }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    getTask(taskId).then((response) => {
      setIsCompleted(response.data.completed);
      console.log(response.data.completed);
    });
  }, [taskId]);

  const handleMarkAsDone = async () => {
    if (isCompleted) {
      await markAsUndone(taskId);
      setIsCompleted(false);
    } else {
      await markAsDone(taskId);
      setIsCompleted(true);
    }
    window.location.reload(); // Refresh the page after marking as done/undone
  };

  return (
    <button
      className={`${
        isCompleted
          ? "bg-[#239B56] text-white"
          : "bg-sky-50 border-[#239B56] text-[#239B56]"
      }  font-bold py-2 px-4 rounded-md`}
      onClick={handleMarkAsDone}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-2">
          <TiTick />
        </div>
        {isCompleted ? "Done" : "Mark as done"}
      </div>
    </button>
  );
};

export default MarkAsCompleted;

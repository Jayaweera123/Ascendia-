import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  markAsDone,
  markAsUndone,
  getTask,
} from "../../services/TaskService.jsx";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const MarkAsCompleted = ({ taskId }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [updatedByUserId, setUpdatedByUserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (userId) {
      setUpdatedByUserId(userId);
    }
  }, []);

  useEffect(() => {
    getTask(taskId).then((response) => {
      setIsCompleted(response.data.completed);
      console.log(response.data.completed);
    });
  }, [taskId]);

  const handleMarkAsDone = async () => {
    const updateDto = {
      updatedByUserId,
    };

    // Display confirmation dialog
    const confirmed = await showConfirmationDialog();
    if (confirmed) {
      try {
        if (isCompleted) {
          await markAsUndone(taskId, updateDto);
          setIsCompleted(false);
          showSuccessMessage("Task marked as undone successfully!");
        } else {
          await markAsDone(taskId, updateDto);
          setIsCompleted(true);
          showSuccessMessage("Task marked as done successfully!");
        }
        // Refresh the browser after marking as done or undone
        window.location.reload();
      } catch (error) {
        console.error("Error marking task:", error);
        showErrorMessage("Failed to mark task. Please try again.");
      }
    }
  };

  const showConfirmationDialog = () => {
    return Swal.fire({
      icon: "info",
      title: "Are you sure?",
      text: "Do you want to chnage the completion status?",
      showCancelButton: true,
    }).then((result) => {
      return result.isConfirmed;
    });
  };

  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
    });
  };

  return (
    <button
      className={`${
        isCompleted
          ? "bg-[#239B56] text-white border-[#239B56] "
          : "bg-sky-50 border-[#101D3F] text-[#1f3261]"
      }  font-bold py-2 px-4 rounded-md border`}
      onClick={handleMarkAsDone}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-2">
          <FaCheck />
        </div>
        {isCompleted ? "Done" : "Mark as done"}
      </div>
    </button>
  );
};

export default MarkAsCompleted;

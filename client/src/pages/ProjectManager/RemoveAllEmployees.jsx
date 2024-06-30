import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { removeAllEmployees } from "../../services/EmployeeService";
import Swal from "sweetalert2";
import { getEmployeeCount } from "../../services/ProjectService";

const RemoveAllEmployees = ({ projectId }) => {
  function popUpWarning(projectId) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure? This action cannot be undone.",
      confirmButtonColor: "#001b5e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeAllEmployees(projectId).then(() => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "All employees have been removed.",
          });
        });
      }
    });
  }

  return (
    <div className="py-3">
      <button
        className="bg-[#9b2929] hover:bg-[#814040] text-white font-bold rounded-md p-2.5"
        onClick={() => popUpWarning(projectId)}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center"></div>
          Remove All Employees
        </div>
      </button>
    </div>
  );
};

export default RemoveAllEmployees;

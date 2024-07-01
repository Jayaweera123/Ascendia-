import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { removeAllEmployees } from "../../services/EmployeeService";
import Swal from "sweetalert2";
import { getEmployeeCount } from "../../services/ProjectService";

const RemoveAllEmployees = ({ projectId }) => {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    getEmployeeCount(projectId)
      .then((response) => {
        setEmployeeCount(response.data); // Store employee count for the project
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  function popUpWarning(projectId) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure? This will remove all the employees from the project.",
      confirmButtonColor: "#b11f1f",
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
          setEmployeeCount(0); // Update the count after removing employees
        });
      }
    });
  }

  return (
    <div className="py-3">
      <button
        className={`bg-[#b11f1f] hover:bg-[#db3737] text-white font-bold rounded-md p-2.5 ${
          employeeCount === 0 && "bg-[#f5a9a9] opacity-50 cursor-not-allowed"
        }`}
        onClick={() => popUpWarning(projectId)}
        disabled={employeeCount === 0}
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

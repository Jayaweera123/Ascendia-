import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { removeAllEmployees } from "../../services/EmployeeService";
import Swal from "sweetalert2";
import { getEmployeeCount } from "../../services/ProjectService";

import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoToJob = ({ taskId }) => {
  const navigator = useNavigate();

  function navigateToJobList() {
    navigator(`/task/${taskId}/joblist`);
  }

  return (
    <button
      className="bg-[#101d3f] hover:bg-[#476ac0] text-white font-bold py-2 px-4 rounded-md"
      onClick={navigateToJobList}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-2 ">
          <FaPlus className="font-bold" />
        </div>
        Jobs
      </div>
    </button>
  );
};

export default GoToJob;

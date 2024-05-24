import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const PreviousEmployeesButton = ({ projectId }) => {
  const navigator = useNavigate();

  function gotoHistory() {
    navigator(`/${projectId}/employee-history`);
  }

  return (
    <button
      className="bg-[#101d3f] hover:bg-[#476ac0] text-white font-bold rounded-md"
      onClick={gotoHistory}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center"></div>
        Previous Employees
      </div>
    </button>
  );
};

export default PreviousEmployeesButton;

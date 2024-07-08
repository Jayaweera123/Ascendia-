import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";

const AddEmployeeButton = ({ projectId }) => {
  const navigator = useNavigate();

  function addNewEmployees() {
    navigator(`/${projectId}/addemployee`);
  }

  return (
    <button
      className="bg-[#101d3f] hover:bg-[#476ac0] text-white font-bold py-2 px-4 rounded-md"
      onClick={addNewEmployees}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-2 ">
          <FaPlus className="font-bold" />
        </div>
        Assign
      </div>
    </button>
  );
};

export default AddEmployeeButton;

import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigator = useNavigate();

  function addNewTask() {
    navigator("/addtask");
  }

  return (
    <button
      className="bg-[#101d3f] hover:bg-[#101d3fc2] text-white font-bold py-2 px-4 mt-5 rounded"
      onClick={addNewTask}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-2 ">
          <FaPlusCircle className="font-bold" />
        </div>
        Add Task
      </div>
    </button>
  );
};

export default AddButton;
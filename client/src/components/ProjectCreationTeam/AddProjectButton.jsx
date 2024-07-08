import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TiUserAddOutline } from "react-icons/ti";

const AddProjectButton = () => {
  const navigator = useNavigate();

  function addNewProject() {
    navigator("/project/addProject");
  }

  return (
    <button
      className="inline-flex flex-row gap-1 ml-10 items-center pb-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-[#101d3f] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="button"
      onClick={addNewProject}
    >
      <div>Add Project</div>
      <div>
        <FaPlusCircle size={20} />
      </div>
    </button>
  );
};

export default AddProjectButton;

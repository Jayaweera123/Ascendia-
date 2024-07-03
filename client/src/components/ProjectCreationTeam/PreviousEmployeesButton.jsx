import React from "react";

const PreviousEmployeesButton = ({ projectId }) => {
  const handleClick = () => {
    // Add navigation or action for previous employees
    console.log(`Previous employees for project ${projectId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
    >
      Previous Project Managers
    </button>
  );
};

export default PreviousEmployeesButton;

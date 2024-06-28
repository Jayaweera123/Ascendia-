import React from "react";

const AddEmployeeButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // Assuming onClick is a function that handles navigation
      className="px-4 py-2 text-white bg-blue-500 rounded"
    >
      + Add
    </button>
  );
};

export default AddEmployeeButton;

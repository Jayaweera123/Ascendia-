import React from "react";

const TaskTitleForJobs = ({ title }) => {
  return (
    <>
      <div className="text-3xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">
        {title}
      </div>
    </>
  );
};

export default TaskTitleForJobs;

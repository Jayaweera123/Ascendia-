import React from "react";

const PageTitle = ({ title }) => {
  return (
    /*<div className="mt-20 flex items-center text-[#001b5e] text-4xl">
      <h2 className="mb-0 font-semibold text-dark dark:text-white">{title}</h2>
    </div>*/
    <>
      <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">
        {title}
      </h1>
    </>
  );
};

export default PageTitle;

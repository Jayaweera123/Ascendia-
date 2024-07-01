import React from "react";
import "../../../src/App.css";

const RadialProgressBar1 = ({ progress }) => {
  const formattedProgress = Number(progress).toFixed(1);
  return (
    <div>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <circle
            className="text-red-700 progress-ring__circle stroke-current"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDashoffset={`calc(400 - (400 * ${progress}) / 100)`}
          ></circle>
          <text x="50" y="50" fontFamily="Verdana" fontSize="12" textAnchor="middle" alignmentBaseline="middle">
            {formattedProgress}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default RadialProgressBar1;

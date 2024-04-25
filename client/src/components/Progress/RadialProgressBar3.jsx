import React, { useState } from "react";
import "../../../src/App.css";

const RadialProgressBar3 = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div class="relative w-40 h-40">
  <svg class="w-full h-full" viewBox="0 0 100 100">
    {/* Background Circle */}
    <circle
      class="text-gray-200 stroke-current"
      stroke-width="10"
      
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
    ></circle>
    {/*Progress circle*/}
    <circle
      class="text-indigo-500  progress-ring__circle stroke-current"
      stroke-width="10"
      stroke-linecap="round"
      cx="50"
      cy="50"
      r="40"
      fill="transparent"
      stroke-dashoffset="calc(400 - (400 * 45) / 100)"
    ></circle>
    
    {/* Center text */}
    <text x="50" y="50" font-family="Verdana" font-size="12" text-anchor="middle" alignment-baseline="middle">30%</text>

  </svg>
</div>
      
    </div>
  );
};

export default RadialProgressBar3;
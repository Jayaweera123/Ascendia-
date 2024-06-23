import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  getCompletedJobCount,
  getJobCount,
} from "../../../services/ProjectService";

const PieChartProgress = ({ projectId }) => {
  const [completedJobs, setCompletedJobs] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    getCompletedJobCount(projectId)
      .then((response) => {
        setCompletedJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  useEffect(() => {
    getJobCount(projectId)
      .then((response) => {
        setTotalJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  const uncompletedJobs = totalJobs - completedJobs;

  const data = [
    { name: "Completed Jobs", value: completedJobs },
    { name: "Uncompleted Jobs", value: uncompletedJobs },
  ];

  const COLORS = ["#101D3F", "#ffffff"];

  const total = completedJobs + uncompletedJobs;
  const percentage = total > 0 ? ((completedJobs / total) * 100).toFixed(0) : 0;

  const renderCustomLabel = () => {
    return (
      <text
        x={210}
        y={200}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-3xl font-bold text-gray-800"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          cornerRadius={5} // Makes edges smoother
          startAngle={90} // Start angle adjusted to make it start from the top
          endAngle={450} // End angle adjusted to make it a full circle
          label={renderCustomLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartProgress;

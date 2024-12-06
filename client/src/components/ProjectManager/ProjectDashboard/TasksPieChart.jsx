import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  getTasksForProject,
  getJobCountForTask,
} from "../../../services/TaskService";

const TasksPieChart = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [chartDimensions, setChartDimensions] = useState({
    width: 400,
    height: 250,
  });
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch tasks for the project when projectId changes
    getTasksForProject(projectId)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  useEffect(() => {
    // Fetch job counts for each task
    const fetchJobCounts = async () => {
      const counts = {};
      for (const task of tasks) {
        try {
          const response = await getJobCountForTask(task.taskId);
          counts[task.taskId] = response.data;
        } catch (error) {
          console.error(error);
        }
      }
      setJobCounts(counts);
    };

    if (tasks.length > 0) {
      fetchJobCounts();
    }
  }, [tasks]);

  useEffect(() => {
    function handleResize() {
      const chartContainerWidth = chartRef.current.offsetWidth;
      const chartContainerHeight = chartRef.current.offsetHeight;
      setChartDimensions({
        width: chartContainerWidth,
        height: chartContainerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = tasks.map((task) => ({
    name: String(task.taskName), // Use String() to ensure it's a string
    value: jobCounts[task.taskId] || 0, // Use 0 if job count is not yet available
  }));

  const COLORS = [
    "#22223B",
    "#4A4E69",
    "#9A8C98",
    "#778DA9",
    "#415A77",
    "#1B263B",
    "#b08968",
  ];

  return (
    <>
      <div className="piechart-container">
        <div
          className="chart-wrapper rounded-md bg-white shadow"
          ref={chartRef}
        >
          {" "}
          <p className="text-sm px-5 pt-5 font-medium text-gray-500">
            Job Counts
          </p>
          <PieChart
            width={chartDimensions.width}
            height={chartDimensions.height}
          >
            <Pie
              data={data}
              margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <style>
        {`
        .piechart-container {
          width: 100%;
          height: 100%; /* Set a default height */
        }

         .chart-wrapper {
          width: 100%;
          height: 100%;
       
        }
        `}
      </style>
    </>
  );
};

export default TasksPieChart;

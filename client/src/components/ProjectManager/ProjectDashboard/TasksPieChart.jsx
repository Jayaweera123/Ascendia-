import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  getTasksForProject,
  getJobCountForTask,
} from "../../../services/TaskService";
import {
  getCompletedJobCount,
  getJobCount,
} from "../../../services/ProjectService";
import { stringify } from "postcss";
import { data } from "autoprefixer";

const TasksPieChart = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [jobCounts, setJobCounts] = useState({});

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

  const data01 = tasks.map((task) => ({
    name: String(task.taskName), // Use String() to ensure it's a string
    value: jobCounts[task.taskId] || 0, // Use 0 if job count is not yet available
  }));

  console.log(data01);

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
      <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};

export default TasksPieChart;

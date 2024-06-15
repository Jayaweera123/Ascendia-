import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  getTasksForProject,
  getJobCountForTask,
  getCompletedJobCountForTask,
} from "../../../services/TaskService";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, progress, jobCount, completedJobCount } = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded-md shadow text-xs text-gray-700">
        <p className="font-semibold">{`${name}`}</p>
        <p>{`Completion Status: ${completedJobCount}/${jobCount} (${progress}%)`}</p>
      </div>
    );
  }

  return null;
};

const TasksBarChart = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [jobCounts, setJobCounts] = useState({});
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const chartRef = useRef(null);

  const fetchTaskData = useCallback(async (taskId) => {
    try {
      const [jobCountResponse, completedJobCountResponse] = await Promise.all([
        getJobCountForTask(taskId),
        getCompletedJobCountForTask(taskId),
      ]);
      return {
        jobCount: jobCountResponse.data,
        completedJobCount: completedJobCountResponse.data,
      };
    } catch (error) {
      console.error(`Error fetching job counts for task ${taskId}:`, error);
      return { jobCount: 0, completedJobCount: 0 };
    }
  }, []);

  useEffect(() => {
    getTasksForProject(projectId)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching tasks for project ${projectId}:`, error);
      });
  }, [projectId]);

  useEffect(() => {
    if (tasks.length > 0) {
      const fetchJobCounts = async () => {
        const counts = {};
        for (const task of tasks) {
          counts[task.taskId] = await fetchTaskData(task.taskId);
        }
        setJobCounts(counts);
      };
      fetchJobCounts();
    }
  }, [tasks, fetchTaskData]);

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

  const data = useMemo(() => {
    return tasks.map((task) => {
      const { jobCount = 0, completedJobCount = 0 } =
        jobCounts[task.taskId] || {};
      return {
        name: String(task.taskName),
        progress:
          jobCount > 0 ? ((completedJobCount / jobCount) * 100).toFixed(2) : 0,
        jobCount,
        completedJobCount,
      };
    });
  }, [tasks, jobCounts]);

  return (
    <>
      <div className="barchart-container rounded-md bg-white shadow">
        {" "}
        <p className="text-sm px-5 pt-5 font-medium text-gray-500">
          Task Progress
        </p>
        <div className="chart-wrapper" ref={chartRef}>
          <BarChart
            width={chartDimensions.width}
            height={chartDimensions.height}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="progress"
              fill="#8884d8"
              barCategoryGap={5}
              barGap={2}
              barSize={20}
            />
          </BarChart>
        </div>
      </div>
      <style>
        {`
        .barchart-container {
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

export default TasksBarChart;

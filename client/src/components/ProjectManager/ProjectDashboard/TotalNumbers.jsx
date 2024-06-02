import React, { useEffect, useState } from "react";
import {
  getJobCount,
  getEmployeeCount,
  getTaskCount,
} from "../../../services/ProjectService";

const TotalNumbers = ({ projectId }) => {
  const [counts, setCounts] = useState({
    jobCount: "",
    employeeCount: "",
    taskCount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobResponse, employeeResponse, taskResponse] = await Promise.all(
          [
            getJobCount(projectId),
            getEmployeeCount(projectId),
            getTaskCount(projectId),
          ]
        );
        setCounts({
          jobCount: jobResponse.data,
          employeeCount: employeeResponse.data,
          taskCount: taskResponse.data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div>
      {/*counts.jobCount}, {counts.employeeCount}, {counts.taskCount}*/}
      <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
        <div className="relative p-6 rounded-md text-gray-700 bg-white shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Employees</span>
            </div>
            <div className="text-3xl dark:text-gray-100">
              {counts.employeeCount}
            </div>
          </div>
        </div>
        <div className="relative p-6 rounded-md text-gray-700 bg-white shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Tasks</span>
            </div>
            <div className="text-3xl dark:text-gray-100">
              {counts.taskCount}
            </div>
          </div>
        </div>
        <div className="relative p-6 rounded-md text-gray-700 bg-white shadow dark:bg-gray-800">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
              <span>Jobs</span>
            </div>
            <div className="text-3xl dark:text-gray-100">{counts.jobCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalNumbers;

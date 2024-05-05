import React, { useEffect, useState } from "react";
import TaskTitleForJobs from "./TaskTitleForJobs";
import { IoConstruct } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineComment } from "react-icons/md";
import { getJobsForTask } from "../../services/JobService";

const JobCard = ({ taskId }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs for the task when taskId changes
    getJobsForTask(taskId)
      .then((response) => {
        setJobs(response.data); // Corrected typo here
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  return (
    <>
      <div className="grid grid-cols-1">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            className="flex items-center p-5 bg-white border rounded-lg shadow-md w-11/12 mb-4"
          >
            <div className="flex-shrink-0">
              <IoConstruct className="w-7 h-7 text-gray-600" />
            </div>
            <div className="ml-6 w-7/12">
              <h3 className="text-xl font-semibold text-gray-800">
                {job.jobName} {/* Display job name */}
              </h3>
              <p className="text-sm text-gray-600">
                {job.description} {/* Display job description */}
              </p>
            </div>

            <div className="flex flex-col ml-6">
              <div className="mb-2 font-medium text-gray-700">
                <p className="text-sm">Start Date</p>
                <div className="flex items-center text-sm text-gray-500">
                  <LuCalendar className="w-5 h-5" />
                  <span className="ml-1">{job.startDate}</span>{" "}
                  {/* Display start date */}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-6">
              <div className="mb-2 font-medium text-gray-700">
                <p className="text-sm">End Date</p>
                <div className="flex items-center text-sm text-gray-500">
                  <LuCalendar className="w-5 h-5" />
                  <span className="ml-1">{job.endDate}</span>{" "}
                  {/* Display end date */}
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <div className="flex items-center">
                <div
                  className={`bg-${
                    job.status === "Completed" ? "green" : "yellow"
                  }-100 text-${
                    job.status === "Completed" ? "green" : "yellow"
                  }-600 rounded-md px-2 py-1 text-xs font-semibold uppercase mr-2`}
                >
                  {job.status} {/* Display job status */}
                </div>
                <MdOutlineComment className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobCard;

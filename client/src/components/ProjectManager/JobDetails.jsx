import React, { useEffect, useState } from "react";
import { IoConstruct } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { getJobById, updateStatusOfJob } from "../../services/JobService";
import { getCommentsForJob } from "../../services/TaskService";
import CommentCardPopup from "./CommentPopUpJobs";

const JobDetails = ({ jobId }) => {
  const [job, setJob] = useState({});
  const [jobStatus, setJobStatus] = useState("");
  const [comments, setComments] = useState([]);

  function getJobDetails(jobId) {
    getJobById(jobId)
      .then((response) => {
        setJob(response.data);
        setJobStatus(response.data.status); // Set job status
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getJobDetails(jobId);
  }, [jobId]);

  useEffect(() => {
    getCommentsForJob(jobId)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jobId]);

  return (
    <>
      <div
        key={job.jobId}
        className="flex items-center p-5 bg-white border rounded-lg shadow-md mb-4"
      >
        <div className="flex-shrink-0">
          <IoConstruct className="w-7 h-7 text-gray-600" />
        </div>
        <div className="ml-6 w-7/12">
          <h3 className="text-lg font-semibold text-gray-700">{job.jobName}</h3>
          <p className="text-sm text-gray-600">{job.description}</p>
        </div>
        {!job.done ? (
          <>
            <div className="flex flex-col ml-6">
              <div className="mb-2 font-medium text-gray-700">
                <p className="text-sm">Start Date</p>
                <div className="flex items-center text-sm text-gray-500">
                  <LuCalendar className="w-5 h-5" />
                  <span className="ml-1">{job.startDate}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-6">
              <div className="mb-2 font-medium text-gray-700">
                <p className="text-sm">End Date</p>
                <div className="flex items-center text-sm text-gray-500">
                  <LuCalendar className="w-5 h-5" />
                  <span className="ml-1">{job.endDate}</span>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="ml-auto">
          <div className="flex items-center text-sm font-medium">
            <div className="flex justify-end pt-1.5">
              <div
                className={`bg-indigo-100 text-indigo-500 status-label ${
                  jobStatus ? `status-label-${jobStatus.toLowerCase()}` : ""
                } rounded-md mr-1 h-fit pl-1 pr-1`}
              >
                {jobStatus}
              </div>
              <CommentCardPopup comments={comments} />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .task-card {
            height: fit-content;
          }
          .status-label-completed {
            background-color: #D5F5E3; /* Green color for completed jobs */
            color: #239B56;
          }
          .status-label-overdue {
            background-color: #FFE7E2; /* Red color for overdue jobs */
            color: #E75538;
          }
          
          .status-label-in-progress {
            background-color: #FFFEC7; /* Yellow color for in-progress jobs */
            color: #EEAF32;
          }
          
        `}
      </style>
    </>
  );
};

export default JobDetails;

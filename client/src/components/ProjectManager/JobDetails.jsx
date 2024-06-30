import React, { useEffect, useState } from "react";
import TaskTitleForJobs from "./TaskTitleForJobs";
import { IoConstruct } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineComment } from "react-icons/md";
import {
  getJobById,
  /*updateStatusOfJob,*/
} from "../../services/JobService";
import { getCommentsForJob } from "../../services/TaskService";
import CommentCardPopup from "./CommentPopUpJobs";

const JobDetails = ({ jobId }) => {
  const [job, setJob] = useState({});
  const [jobStatus, setJobStatus] = useState("");
  const [comments, setComments] = useState([]);

  function getJobDetails(jobId) {
    getJobById(jobId)
      .then((response) => {
        console.log(response.data);
        setJob(response.data);
        //setTimeDifference(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // Call Taskdetails function when component mounts
    getJobDetails(jobId);
  }, [jobId]); // Execute effect whenever taskId changes

  useEffect(() => {
    getCommentsForJob(jobId)
      .then((response) => {
        setComments(response.data);
        console.log(comments);
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
          <div className="flex items-center  text-sm font-medium">
            <div className="flex justify-end pt-1.5 ">
              <div
                className={`bg-indigo-100 text-indigo-500 rounded-md mr-1 h-fit pl-1 pr-1 ${
                  jobStatus[job.jobId]
                    ? `status-label-${jobStatus[job.jobId].toLowerCase()}`
                    : ""
                }`}
              >
                {jobStatus[job.jobId]}
              </div>

              {/*<MdOutlineComment className="w-6 h-6 text-gray-600" />*/}
              {/* Render the comment cards */}
              {/*<div className="mt-1  text-gray-700 font-semibold">
                        <CommentCard comments={comments} />
                      </div>*/}

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
    background-color: #D5F5E3 ; /* Green color for completed projects */
    color: #239B56  ;
  }

.status-label-overdue {
  background-color: #FFE7E2; /* Red color for overdue projects */
  color: #E75538;
  }

  .status-label-in-progress {
    background-color: #FFFEC7; /* Yellow color for upcoming projects */
    color: #EEAF32;
  }

  .task-name-container {
    max-height: calc(10 * 0.9em); /* 2 lines * line-height */
    overflow: hidden;
    position: relative;
  }

.task-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: white-space 0.3s; /* Smooth transition for white-space change */

    /* Additional styles for hover */
    &:hover {
      white-space: normal; /* Make overflowing text visible when hovered */`}
      </style>
    </>
  );
};

export default JobDetails;

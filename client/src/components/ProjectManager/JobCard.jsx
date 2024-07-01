import React, { useEffect, useState } from "react";
import TaskTitleForJobs from "./TaskTitleForJobs";
import { IoConstruct } from "react-icons/io5";
import { LuCalendar } from "react-icons/lu";
import { MdOutlineComment } from "react-icons/md";
import {
  getJobsForTask,
  searchJobs,
  /*updateStatusOfJob,*/
} from "../../services/JobService";
import { getCommentsForJob } from "../../services/TaskService";
import { IoSearch } from "react-icons/io5";
import AddEmployeeButton from "./AddEmployeeButton";
import SearchBar from "../../components/ProjectManager/SearchBar";
import CommentCard from "./CommentCard";
import JobDetails from "./JobDetails";

const JobCard = ({ taskId }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

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

  //Search task
  useEffect(() => {
    if (search !== "") {
      searchJobs(taskId, search)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      //if search is empty fetch all equipment
      getJobsForTask(taskId)
        .then((response) => {
          setJobs(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [search]);

  //sort according to the status
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredJobs =
    selectedStatus === "all"
      ? jobs
      : jobs.filter((job) => jobStatus[job.jobId] === selectedStatus);

  return (
    <>
      <div className="w-full mt-5">
        <div className="flex items-center justify-between pb-6">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                className="border border-[#101D3F] text-[#101D3F] font-bold py-2 px-4 rounded-md flex items-center"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="all">All</option>
                <option value="Overdue">Overdue</option>
                <option value="In-Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>

            {/* <AddEmployeeButton />*/}
          </div>
        </div>

        <div className="">
          {filteredJobs.length === 0 ? (
            <p className="py-1 sm:py-2 text-center text-gray-500">
              <em>No jobs yet for this task. </em>
            </p>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.jobId}>
                <JobDetails jobId={job.jobId} />
                {/* Job card content */}
              </div>
            ))
          )}
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

export default JobCard;

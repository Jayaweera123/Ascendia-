import React, { useEffect, useState } from "react";
import {
  getProjectById,
  getProjectDuration,
} from "../../../services/ProjectService";
import { formatDate } from "../Functions.js";

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDiscription, setProjectDiscription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectDuration, setProjectDuration] = useState("");

  useEffect(() => {
    Taskdetails(projectId);
  }, [projectId]);

  function Taskdetails(projectId) {
    getProjectById(projectId)
      .then((response) => {
        console.log(response.data);
        setProject(response.data);
        setProjectName(response.data.projectName);
        setProjectDiscription(response.data.projectDescription);
        setStartDate(response.data.createdDate);
        setEndDate(response.data.endDate);
        setProjectStatus(response.data.projectStatus);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProjectDuration(projectId)
      .then((response) => {
        setProjectDuration(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  return (
    <>
      <div className="flex mt-10">
        <div className="relative flex w-full max-w-[48rem] flex-row rounded-md bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-md rounded-r-none bg-white bg-clip-border text-gray-700">
            <img
              src="../../../../public/roses.jpg"
              alt="image"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {projectName}
            </h4>
            <p className="mb-8 block font-sans text-base font-normal text-justify leading-relaxed text-gray-700 antialiased">
              {projectDiscription}
            </p>
            <div className="flex justify-between items-center mt-2">
              <div className="flex flex-col   text-gray-700">
                <p>Start Date: {formatDate(startDate)}</p>
                <p>End Date: {formatDate(endDate)}</p>
              </div>
            </div>
            <div className="">
              <div className="font-semibold bg-indigo-100 text-indigo-500">
                period: {JSON.stringify(projectDuration).replace(/"/g, "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

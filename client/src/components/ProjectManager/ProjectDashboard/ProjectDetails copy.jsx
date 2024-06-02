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
      <div className="mt-2.5 flex bg-white shadow-md rounded-md ">
        {/*Project Image */}
        <div className="overflow-hidden">
          <img className="rounded-md" src="../../../../public/roses.jpg" />
        </div>

        {/*Project Details */}
        <div className="p-5">
          <div className="flex justify-between  w-full">
            <div className="flex text-xl font-semibold mb-2 text-gray-700">
              {projectName}
            </div>
          </div>

          <div className="text-justify">
            <p className="text-gray-800 mt-1">{projectDiscription}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col   text-gray-700">
              <p>Start Date: {formatDate(startDate)}</p>
              <p>End Date: {formatDate(endDate)}</p>
            </div>
            <div className="ml-auto">
              <div className="ml-auto font-semibold bg-indigo-100 text-indigo-500">
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

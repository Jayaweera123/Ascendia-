import React, { useEffect, useState } from "react";
import {
  getAllProjectCards,
  getProjectForPM,
} from "../../services/ProjectService.jsx";
import { Link } from "react-router-dom";

const ProjectCard = ({ projectManagerId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjectForPM(projectManagerId)
      .then((response) => {
        setProjects(response.data);
        console.log(projects);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectManagerId]);

  return (
    <>
      <div className="mt-10">
        <div className="mx-auto">
          <main className="">
            <div className="px-4">
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                {projects.map((project) => (
                  <Link
                    key={project.projectId}
                    to={`/project/${project.projectId}/dashboard`}
                  >
                    <div
                      key={project.projectId}
                      className="mb-6 rounded-lg bg-white shadow-md task-card "
                    >
                      <div className="pl-6 pr-6 pt-2">
                        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
                          <div className="flex items-center w-2/3">
                            <div className="project-name-container">
                              <h3 className="text-lg font-semibold text-gray-700 project-name cursor-pointer">
                                {project.projectName}
                              </h3>
                            </div>
                          </div>
                          <div className="flex justify-end pt-1.5">
                            <div className="text-sm font-medium">
                              <div
                                className={`bg-indigo-100  text-indigo-500 rounded-md pl-1 pr-1 status-label-${project.projectStatus.toLowerCase()}`}
                              >
                                {project.projectStatus}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <p className="py-6 px-6 text-sm font-normal text-gray-500">
                          {project.projectDescription.length >= 150
                            ? project.projectDescription.substring(0, 150) +
                              "..." // truncate if longer
                            : project.projectDescription +
                              Array(150 - project.projectDescription.length)
                                .fill("\u00A0")
                                .join(" ")}
                          {/* Add whitespace if shorter */}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Style tag for embedding CSS */}
      <style>{`
        .status-label-completed {
          background-color: #ddf6df; /* Green color for completed projects */
          color: #24976d;
        }
      
      .status-label-overdue {
        background-color: #FFE7E2; /* Red color for overdue projects */
        color: #E75538;
        }
      
        .status-label-in-progress {
          background-color: #FFFEC7; /* Yellow color for upcoming projects */
          color: #EEAF32;
        }

        .truncate {
          width: 100%; /* or adjust to your desired width */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-name-container {
          max-height: calc(10 * 0.9em); /* 2 lines * line-height */
          overflow: hidden;
          position: relative;
          
        }
      
      .project-name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: white-space 0.3s; /* Smooth transition for white-space change */
      
          /* Additional styles for hover */
          &:hover {
            white-space: normal; /* Make overflowing text visible when hovered */
          }
      `}</style>
    </>
  );
};

export default ProjectCard;

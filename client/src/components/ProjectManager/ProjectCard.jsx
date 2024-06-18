import React, { useEffect, useState } from "react";
import { getAllProjectCards } from "../../services/ProjectService.jsx";
import { Link } from "react-router-dom";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjectCards()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
                    to={`/projects/${project.projectId}/tasks`}
                  >
                    <div
                      key={project.projectId}
                      className="mb-6 bg-white rounded-lg shadow-lg"
                    >
                      <div className="pt-2 pb-6 pl-6 pr-6">
                        <div className="flex items-center justify-between pb-2 border-b-2 border-gray-300">
                          <div className="flex items-center">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-700">
                                {project.projectName}
                              </h3>
                            </div>
                          </div>

                          <p className="text-sm font-medium">
                            <div
                              className={`bg-indigo-100  text-indigo-500 rounded-md pl-1 pr-1 status-label-${project.projectStatus.toLowerCase()}`}
                            >
                              {project.projectStatus}
                            </div>
                          </p>
                        </div>
                        <p className="my-6 text-sm font-normal text-gray-500">
                          {project.projectDescription}
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

        .status-label-upcoming {
          background-color: #fcd34d; /* Yellow color for upcoming projects */
          color: #ffffff;
        }
      `}</style>
    </>
  );
};

export default ProjectCard;

import React, { useEffect, useState } from "react";
import {
  getProjectByProjectManagerId,
  getProjectForPM,
  searchProject,
} from "../../services/ProjectService.jsx";
import SearchBar from "../../components/ProjectManager/SearchBar";
import { Link } from "react-router-dom";

const ProjectCard = ({ projectManagerId }) => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedProjects, setExpandedProjects] = useState({});

  const handleSeeMoreClick = (projectId) => {
    setExpandedProjects((prevExpandedProjects) => ({
      ...prevExpandedProjects,
      [projectId]: !prevExpandedProjects[projectId],
    }));
  };

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

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  //Search task
  useEffect(() => {
    if (search !== "") {
      searchProject(projectManagerId, search)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      //if search is empty fetch all equipment
      getProjectForPM(projectManagerId)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [search]);

  const filteredProjects =
    selectedStatus === "all"
      ? projects
      : projects.filter((project) => project.projectStatus === selectedStatus);

  return (
    <>
      <div className="">
        <div className="">
          <main className="">
            <div className="">
              <div className="flex items-center justify-between pb-6 mt-2.5">
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
                </div>
              </div>
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.projectId}
                    className="mb-6 pb-6 rounded-lg bg-white shadow-md project-card"
                  >
                    <Link
                      key={project.projectId}
                      to={`/project/${project.projectId}/dashboard`}
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

                      <div className="project-description-container">
                        <div className="text-sm font-normal px-6 pt-4 text-gray-500 project-description">
                          {expandedProjects[project.projectId]
                            ? project.projectDescription
                            : project.projectDescription.length > 170
                            ? `${project.projectDescription.slice(0, 170)}...`
                            : project.projectDescription}

                          {project.projectDescription.length > 170 && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleSeeMoreClick(project.projectId);
                              }}
                              className="text-indigo-500 hover:underline ml-1"
                            >
                              {expandedProjects[project.projectId]
                                ? "See less"
                                : "See more"}
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Style tag for embedding CSS */}
      <style>{`
        .project-card {
          height: fit-content;
        }
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
          transition: white-space 2s; /* Smooth transition for white-space change */
      
          /* Additional styles for hover */ 
          &:hover {
            white-space: normal; /* Make overflowing text visible when hovered */
          }
      `}</style>
    </>
  );
};

export default ProjectCard;

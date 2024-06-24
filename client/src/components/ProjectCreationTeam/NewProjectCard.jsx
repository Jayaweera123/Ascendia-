
import React, { useEffect, useState } from "react";
import { getAllProjectCards } from "../../services/ProjectService.jsx";
import { MdEdit, MdDelete, MdPerson } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const NewProjectCard = () => {
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

  const handleDelete = (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this project!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/project/${projectId}`)
          .then(() => {
            Swal.fire("Deleted!", "Your project has been deleted.", "success");
            setProjects(
              projects.filter((project) => project.projectId !== projectId)
            );
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error!", "Failed to delete the project.", "error");
          });
      }
    });
  };

  if (projects.length === 0) {
    return <div className="mt-10 text-center">No projects available.</div>;
  }

  return (
    <>
      <div className="mt-10">
        <div className="mx-auto">
          <main>
            <div className="px-4">
              <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.projectId}
                    className="mb-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    {/* Project Image */}
                    <img
                      className="object-cover w-full h-48 rounded-t-lg"
                      src={
                        project.image
                          ? `http://localhost:8080/${project.image.replace(
                              /\\/g,
                              "/"
                            )}`
                          : ""
                      }
                      alt={project.projectName}
                    />
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
                            className={`bg-indigo-100 text-indigo-500 rounded-md pl-1 pr-1 status-label-${project.projectStatus.toLowerCase()}`}
                          >
                            {project.projectStatus}
                          </div>
                        </p>
                        <div className="flex">
                          <MdPerson
                            className="cursor-pointer mr-2 text-green-500"
                            size={20}
                          />
                          <MdEdit
                            className="cursor-pointer mr-2 text-blue-800"
                            size={20}
                          />
                          <MdDelete
                            className="cursor-pointer text-red-600"
                            size={20}
                            onClick={() => handleDelete(project.projectId)}
                          />
                        </div>
                      </div>

                      <p className="my-6 text-sm font-normal text-gray-500">
                        {project.projectDescription}
                      </p>
                      <div className="flex justify-between">
                        <span className="badge badge-green">
                          {new Date(project.createdDate).toLocaleDateString()}
                        </span>
                        <span className="badge badge-red">
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Style tag for embedding CSS */}
      <style>{`
        .status-label-completed {
          background-color: #34d399; /* Green color for completed projects */
          color: #ffffff;
        }

        .status-label-ongoing {
          background-color: #60a5fa; /* Blue color for ongoing projects */
          color: #ffffff;
        }

        .status-label-upcoming {
          background-color: #fcd34d; /* Yellow color for upcoming projects */
          color: #ffffff;
        }

        .badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .badge-green {
          background-color: #34d399; /* Green badge for createdDate */
          color: #ffffff;
        }

        .badge-red {
          background-color: #f87171; /* Red badge for endDate */
          color: #ffffff;
        }

        .hover:scale-105:hover {
          transform: scale(1.05);
        }

        .hover:shadow-xl:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
};

export default NewProjectCard;


import React, { useEffect, useState } from "react";
import { getAllProjectCards } from "../../services/ProjectService.jsx";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

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

  const handleDelete = (projectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/project/${projectId}`)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your project has been deleted.',
              'success'
            );
            setProjects(projects.filter(project => project.projectId !== projectId));
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire(
              'Error!',
              'Failed to delete the project.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="mt-10">
      <div className="mx-auto">
        <main className="">
          <div className="px-4">
            <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
              {projects.map((project) => (
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
                      <div className="flex">
                        <MdEdit className="mr-2 text-slate-600" />
                        <MdDelete
                          className="cursor-pointer text-slate-600"
                          onClick={() => handleDelete(project.projectId)}
                        />
                      </div>
                    </div>

                    <p className="my-6 text-sm font-normal text-gray-500">
                      {project.projectDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectCard;

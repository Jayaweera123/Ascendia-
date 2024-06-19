import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import { MdAssignmentAdd } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddProject = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [createdDate, setCreatedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({
    projectType: "",
    projectName: "",
    projectDescription: "",
    projectStatus: "",
    createdDate: "",
    endDate: "",
  });

  const saveProject = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.append("projectDescription", projectDescription);
    formData.append("projectName", projectName);
    formData.append("projectType", projectType);
    formData.append("endDate", endDate);
    formData.append("createdDate", createdDate);
    formData.append("projectStatus", projectStatus);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/project/addProject",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        // Show SweetAlert success message
        Swal.fire({
          title: "Success!",
          text: "Project created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to projects page
          navigate("/project/projectslist");
        });
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleAssignProjectManager = () => {
    navigate("/assignPM");
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    // Validate each form field
    if (!projectType) {
      errorsCopy.projectType = "Project type is required";
      valid = false;
    } else {
      errorsCopy.projectType = "";
    }

    if (!projectName) {
      errorsCopy.projectName = "Project name is required";
      valid = false;
    } else {
      errorsCopy.projectName = "";
    }

    if (!projectDescription) {
      errorsCopy.projectDescription = "Project description is required";
      valid = false;
    } else {
      errorsCopy.projectDescription = "";
    }

    if (!projectStatus) {
      errorsCopy.projectStatus = "Project status is required";
      valid = false;
    } else {
      errorsCopy.projectStatus = "";
    }

    if (!createdDate) {
      errorsCopy.createdDate = "Start date is required";
      valid = false;
    } else {
      errorsCopy.createdDate = "";
    }

    if (!endDate) {
      errorsCopy.endDate = "End date is required";
      valid = false;
    } else {
      errorsCopy.endDate = "";
    }

    // Update errors state
    setErrors(errorsCopy);

    return valid;
  };

  const handleClearForm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will clear all form fields. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearForm();
      }
    });
  };

  const clearForm = () => {
    setProjectType("");
    setProjectName("");
    setProjectDescription("");
    setProjectStatus("");
    setProfileImage(null);
    setCreatedDate("");
    setEndDate("");
    setErrors({
      projectType: "",
      projectName: "",
      projectDescription: "",
      projectStatus: "",
      createdDate: "",
      endDate: "",
    });
  };

  return (
    <div>
      <TopNavigation />
      <section className="flex">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
        <div className="relative w-screen bg-cover bg-zinc-50 h-fit">
          <div className="m-3 text-xl font-semibold text-gray-900">
            <form method="POST" encType="multipart/form-data">
              <div className="space-y-5">
                <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
                  <MdAssignmentAdd size={70} color="#001b5e" />
                  <div>
                    <h1 className="place-items-baseline py-1/2 text-5xl font-bold leading-relaxed text-left text-[#001b5e]">
                      Create Project
                    </h1>
                  </div>
                </div>

                <div className="relative m-32 overflow-x-auto bg-white shadow-md rouwinded-lg">
                  <div className="pb-20 border-b border-red-600">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
                      <div className="flex flex-col sm:col-span-8">
                        <div className="flex justify-end mt-8 mb-8">
                          <h1 className="text-4xl font-bold">
                            Project Creation Form
                          </h1>
                        </div>
                        <div>
                          <div className="flex flex-col mt-12 ml-24 sm:col-span-8">
                            <div className="mt-8">
                              <label
                                htmlFor="project-type"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Type
                              </label>
                              <div className="mt-2">
                                <select
                                  id="project-type"
                                  type="text"
                                  name="project-type"
                                  autoComplete="off"
                                  value={projectType}
                                  onChange={(e) =>
                                    setProjectType(e.target.value)
                                  }
                                  className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
                                  required
                                >
                                  <option value="" disabled selected>
                                    Select Project Type
                                  </option>
                                  <option value="web">Web Development</option>
                                  <option value="mobile">
                                    Mobile App Development
                                  </option>
                                  <option value="design">Design Project</option>
                                  <option value="other">Other</option>
                                </select>
                                {errors.projectType && (
                                  <p className="mt-2 text-red-500">
                                    {errors.projectType}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-8">
                              <label
                                htmlFor="projectName"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="projectName"
                                  id="projectName"
                                  autoComplete="given-name"
                                  maxLength={200}
                                  value={projectName}
                                  onChange={(e) =>
                                    setProjectName(e.target.value)
                                  }
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                                {errors.projectName && (
                                  <p className="mt-2 text-red-500">
                                    {errors.projectName}
                                  </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                  Maximum 200 characters
                                </p>
                              </div>
                            </div>
                            <div className="mt-8">
                              <label
                                htmlFor="comment"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="comment"
                                  name="comment"
                                  type="text"
                                  autoComplete="off"
                                  rows="6"
                                  value={projectDescription}
                                  onChange={(e) =>
                                    setProjectDescription(e.target.value)
                                  }
                                  className="block w-full px-3 py-2 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Write your project description here..."
                                  required
                                ></textarea>
                                {errors.projectDescription && (
                                  <p className="mt-2 text-red-500">
                                    {errors.projectDescription}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-8">
                              <label
                                htmlFor="project-status"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Status
                              </label>
                              <div className="mt-2">
                                <select
                                  id="project-status"
                                  name="project-status"
                                  type="text"
                                  autoComplete="off"
                                  value={projectStatus}
                                  onChange={(e) =>
                                    setProjectStatus(e.target.value)
                                  }
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                >
                                  <option value="" disabled selected>
                                    Select Project Status
                                  </option>
                                  <option value="pending">Pending</option>
                                  <option value="in_progress">
                                    In Progress
                                  </option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                {errors.projectStatus && (
                                  <p className="mt-2 text-red-500">
                                    {errors.projectStatus}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-8">
                              <label
                                htmlFor="image"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Image
                              </label>
                              <div className="flex items-center mt-2">
                                <div className="w-1/2">
                                  <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) =>
                                      setProfileImage(e.target.files[0])
                                    }
                                    className="block w-full h-10 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                  />
                                </div>
                                <div className="w-1/2 ml-4">
                                  {profileImage && (
                                    <img
                                      src={URL.createObjectURL(profileImage)}
                                      alt="Project Image"
                                      className="object-cover w-full h-32 border border-gray-300 rounded-md shadow-sm"
                                    ></img>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap mt-8">
                              <div className="pr-4 sm:w-1/2">
                                <label
                                  htmlFor="added-date"
                                  className="block text-base font-medium leading-6 text-gray-900"
                                >
                                  Started Date
                                </label>
                                <div className="mt-4">
                                  <input
                                    type="date"
                                    name="added-date"
                                    id="added-date"
                                    autoComplete="added-date"
                                    value={createdDate}
                                    onChange={(e) =>
                                      setCreatedDate(e.target.value)
                                    }
                                    className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                                    required
                                  />
                                  {errors.createdDate && (
                                    <p className="mt-2 text-red-500">
                                      {errors.createdDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="mt-4 sm:w-1/2 sm:mt-0">
                                <label
                                  htmlFor="end-date"
                                  className="block text-base font-medium leading-6 text-gray-900"
                                >
                                  Estimated End Date
                                </label>
                                <div className="mt-4">
                                  <input
                                    type="date"
                                    name="end-date"
                                    id="end-date"
                                    autoComplete="end-date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                                    required
                                  />
                                  {errors.endDate && (
                                    <p className="mt-2 text-red-500">
                                      {errors.endDate}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-16">
                              <button
                                onClick={handleAssignProjectManager}
                                className="flex items-center px-4 h-10 py-2 mr-4 font-bold text-gray-300 bg-[#101d3f] rounded-md text-gray hover:bg-blue-800"
                              >
                                <span className="mr-2">
                                  <IoPersonAdd />
                                </span>
                                Assign Project Manager
                              </button>
                            </div>

                            <div className="flex justify-center mt-6 mb-5 gap-x-6">
                              <button
                                type="button"
                                onClick={saveProject}
                                className="px-3 py-2 text-xl font-semibold text-gray-300 bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Create
                              </button>

                              <button
                                type="button"
                                onClick={handleClearForm}
                                className="px-3 py-2 text-xl font-semibold leading-6 text-gray-900 bg-gray-300 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProject;

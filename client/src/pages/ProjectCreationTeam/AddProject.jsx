import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import { MdAssignmentAdd } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import * as ProjectService from "../../services/ProjectService";


const AddProject = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); 
  const { projectId } = useParams();

  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    projectDescription: '',
    projectStatus: '',
    createdDate: '',
    endDate: '',
    profileImage: null,
    clientName: '', 
    consultantName: '', 
  });

  const [errors, setErrors] = useState({
    projectType: "",
    projectName: "",
    projectDescription: "",
    projectStatus: "",
    createdDate: "",
    endDate: "",
    profileImage: "",
    clientName: "",
    consultantName: "",
  });

  useEffect(() => {
    if (projectId && projectId !== "undefined") {
      fetchFormDataById(projectId); // Fetch project data if projectId exists
    } else {
      resetFormData();
    }
  }, [projectId]);
  
  const fetchFormDataById = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`http://localhost:8080/pmanager/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const { projectName, projectType, projectDescription, projectStatus, createdDate, endDate, image, clientFirstName, clientLastName, consultantFirstName, consultantLastName } = response.data;
      setFormData({
        projectName,
        projectType,
        projectDescription,
        projectStatus,
        createdDate,
        endDate,
        profileImage: image ? `http://localhost:8080/${image}` : null,
        clientName: `${clientFirstName} ${clientLastName}`,
        consultantName: `${consultantFirstName} ${consultantLastName}` 
      });
    } catch (error) {
      console.error('Error fetching project data:', error);
      if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Access Forbidden',
          text: 'You do not have permission to view this project.'
        }).then(() => {
          navigate('/projectslist');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching project data.'
        });
      }
    }
  };
  
  const resetFormData = () => {
    setFormData({
      projectName: '',
      projectType: '',
      projectDescription: '',
      projectStatus: '',
      createdDate: '',
      endDate: '',
      profileImage: null,
      clientName: '',
      consultantName: '',  
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      if (name === 'clientName' || name === 'consultantName') {
          // Split the name into first and last name
          const [firstName, ...lastNameParts] = value.split(' ');
          if (name === 'clientName') {
              setFormData({
                  ...formData,
                  clientName: value,
                  clientFirstName: firstName,
                  clientLastName: lastNameParts.join(' ')
              });
          } else if (name === 'consultantName') {
              setFormData({
                  ...formData,
                  consultantName: value,
                  consultantFirstName: firstName,
                  consultantLastName: lastNameParts.join(' ')
              });
          }
      } else {
          setFormData({
              ...formData,
              [name]: value
          });
      }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors({
        ...errors,
        profileImage: 'Profile image size should not exceed 2MB'
      });
    } else {
      setFormData({
        ...formData,
        profileImage: file
      });
      setErrors({
        ...errors,
        profileImage: ''
      });
    }
  };


  const saveProject = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'profileImage' && formData[key] && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'profileImage') {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'No token found, please login again.',
        }).then(() => {
          navigate('/login');
        });
        return;
      }
  
      let response;
      if (projectId) {
        response = await ProjectService.updateProjectById(projectId, formDataToSend);
      } else {
        response = await ProjectService.createProject(formDataToSend);
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Project ${projectId ? 'updated' : 'created'} successfully`,
      }).then(() => {
        navigate('/projectslist');
      });
    } catch (error) {
      console.error('Error adding/updating project:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `An error occurred while adding/updating the project. Please try again.`,
      });
    }
  };
  

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };
  
    // Validate each form field
    if (!formData.projectType) {
      errorsCopy.projectType = "Project type is required";
      valid = false;
    } else {
      errorsCopy.projectType = "";
    }
  
    if (!formData.projectName) {
      errorsCopy.projectName = "Project name is required";
      valid = false;
    } else {
      errorsCopy.projectName = "";
    }
  
    if (!formData.projectDescription) {
      errorsCopy.projectDescription = "Project description is required";
      valid = false;
    } else {
      errorsCopy.projectDescription = "";
    }
  
    if (!formData.projectStatus) {
      errorsCopy.projectStatus = "Project status is required";
      valid = false;
    } else {
      errorsCopy.projectStatus = "";
    }

    if (formData.profileImage && formData.profileImage.size > 2 * 1024 * 1024) {
      errorsCopy.profileImage = 'Profile image size should not exceed 2MB';
      valid = false;
    } else {
      errorsCopy.profileImage = '';
    }

    if (!formData.clientName) {
      errorsCopy.clientName = "Client Name is required";
      valid = false;
    } else {
      errorsCopy.clientName = "";
    }

    if (!formData.consultantName) {
      errorsCopy.consultantName = "Consultant Name is required";
      valid = false;
    } else {
      errorsCopy.consultantName = "";
    }
  
    if (!formData.createdDate) {
      errorsCopy.createdDate = "Start date is required";
      valid = false;
    } else {
      errorsCopy.createdDate = "";
    }
  
    if (!formData.endDate) {
      errorsCopy.endDate = "End date is required";
      valid = false;
    } else {
      errorsCopy.endDate = "";
    }

    // Check if endDate is after createdDate
    if (formData.createdDate && formData.endDate) {
      const createdDate = new Date(formData.createdDate);
      const endDate = new Date(formData.endDate);

      if (createdDate > endDate) {
        errorsCopy.endDate = "End date must be after the start date";
        valid = false;
      } else {
        errorsCopy.endDate = "";
      }
    }
  
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
    resetFormData();
    setErrors({
      projectType: "",
      projectName: "",
      projectDescription: "",
      projectStatus: "",
      createdDate: "",
      endDate: "",
      profileImage: "",
      clientName: "",
      consultantName: "",
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
                {projectId ?<MdEditDocument size={70} color="#001b5e" /> : <MdAssignmentAdd size={70} color="#001b5e" />}
                  <div>
                    <h1 className="place-items-baseline py-1/2 text-5xl font-bold leading-relaxed text-left text-[#001b5e]">
                    {projectId ? 'Edit Project' : 'Create Project'}
                    </h1>
                  </div>
                </div>
                <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
                  <div className="pb-12 border-b border-gray-900/10">
                
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
                      <div className="flex flex-col sm:col-span-8">
                        
                        <div>
                          <div className="flex flex-col ml-5 sm:col-span-8">
                            
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
                                  name="projectType" // Corrected name attribute
                                  autoComplete="off"
                                  value={formData.projectType}
                                  onChange={handleChange}
                                  className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
                                  required
                                >
                                  <option value="" disabled selected>
                                    Select Project Type
                                  </option>
                                  <option value="residential">Residential Construction</option>
                                  <option value="commercial">Commercial Construction</option>
                                  <option value="industrial">Industrial Construction</option>
                                  <option value="infrastructure">Infrastructure Construction</option>
                                  <option value="other">Other Constrction</option>
                                </select>
                                {errors.projectType && <span className="text-red-500">{errors.projectType}</span>}
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
                                  maxLength={100}
                                  value={formData.projectName}
                                  onChange={handleChange}
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                                {errors.projectName && <span className="text-red-500">{errors.projectName}</span>}
                                <p className="mt-1 text-sm text-gray-500">
                                  Maximum 100 characters
                                </p>
                              </div>
                            </div>
                            <div className="mt-8">
                              <label
                                htmlFor="project-description"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Project Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  name="projectDescription" // Corrected name attribute
                                  id="project-description"
                                  type="text"
                                  autoComplete="off"
                                  rows="6"
                                  value={formData.projectDescription}
                                  onChange={handleChange}
                                  className="block w-full px-3 py-2 text-gray-900 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Write your project description here..."
                                  required
                                ></textarea>
                                </div>
                                {errors.projectDescription && <span className="text-red-500">{errors.projectDescription}</span>}
                                
                              
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
                                  name="projectStatus" // Corrected name attribute
                                  type="text"
                                  autoComplete="off"
                                  value={formData.projectStatus}
                                  onChange={handleChange}
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
                                {errors.projectStatus && <span className="text-red-500">{errors.projectStatus}</span>}
                              </div>
                            </div>
                            <div className="mt-8">
                              <label htmlFor="image" className="block text-base font-medium leading-6 text-gray-900">
                                Project Image
                              </label>
                              <div className="flex items-center mt-2">
                                <div className="w-1/2">
                                  <input
                                    type="file"
                                    id="image"
                                    name="profileImage"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full h-10 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required={!formData.profileImage}
                                  />
                                </div>
                                <div className="w-1/2 ml-4">
                                  {formData.profileImage && (
                                    <img
                                      src={formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage}
                                      alt="Project Image"
                                      className="object-cover w-full h-32 border border-gray-300 rounded-md shadow-sm"
                                    />
                                  )}
                                </div>
                                {errors.profileImage && <div className="text-red-500 mt-2">{errors.profileImage}</div>}
                              </div>

                              <div className="mt-8">
                              <label
                                htmlFor="clientName"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Client Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="clientName"
                                  id="clientName"
                                  autoComplete="given-name"                 
                                  value={formData.clientName}
                                  onChange={handleChange}
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                                {errors.clientName && (
                                  <p className="mt-2 text-red-500">
                                    {errors.clientName}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-8">
                              <label
                                htmlFor="consultantName"
                                className="block text-base font-medium leading-6 text-gray-900"
                              >
                                Consultant Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="consultantName"
                                  id="consultantName"
                                  autoComplete="given-name"                 
                                  value={formData.consultantName}
                                  onChange={handleChange}
                                  className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                                {errors.consultantName && (
                                  <p className="mt-2 text-red-500">
                                    {errors.consultantName}
                                  </p>
                                )}
                              </div>
                            </div>
                            

                            
                            <div className="flex flex-wrap mt-8">
                              <div className="pr-4 sm:w-1/2">
                                <label
                                  htmlFor="created-date"
                                  className="block text-base font-medium leading-6 text-gray-900"
                                >
                                  Started Date
                                </label>
                                <div className="mt-4">
                                  <input
                                    type="date"
                                    name="createdDate" // Corrected name attribute
                                    id="created-date"
                                    autoComplete="added-date"
                                    value={formData.createdDate}
                                    onChange={handleChange}
                                    className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                                    required
                                  />
                                  </div>
                                  {errors.createdDate && <span className="text-red-500">{errors.createdDate}</span>}
                                
                              
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
                                    name="endDate" // Corrected name attribute
                                    id="end-date"
                                    autoComplete="end-date"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                                    required
                                  />
                                  </div>
                                  {errors.endDate && <span className="text-red-500">{errors.endDate}</span>}
                                
                              </div>
                            </div>

                            </div>
                            

                            <div className="flex items-center justify-center mt-6 mb-5 mr-5 gap-x-6">
                            
                              <button
                                type="submit"
                                onClick={saveProject}
                                className="w-24 px-4 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                {projectId ? 'Update' : 'Create'}
                              </button>

                              <button
                                type="button"
                                onClick={handleClearForm}
                                className="w-24 px-4 py-2 text-xl font-semibold text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

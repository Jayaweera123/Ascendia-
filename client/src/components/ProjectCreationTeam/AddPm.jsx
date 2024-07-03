import React, { useEffect, useState } from "react";
import {
  getAllAvailableProjectManagers,
  getAllAvailableUsers,
  addAssignment,
} from "../../services/EmployeeService";
import { getProjectById } from "../../services/ProjectService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { se } from "date-fns/locale";

function AddPm({ projectId }) {
  const [projectName, setProjectName] = useState("");
  //Prject manger ID
  const [pmId, setPmId] = useState(null);
  const [designation, setDesignation] = useState("all");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState("all");


  useEffect(() => {
    getProjectById(projectId)
      .then((response) => {
        setProjectName(response.data.projectName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  useEffect(() => {
    getAllAvailableProjectManagers()
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setMessage("No available managers");
        } else {
          setMessage("");
          setAvailableUsers(response.data);
        }
        //setAvailableUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigator = useNavigate();
  function handleCancel() {
    navigator("/project/" + projectId + "/employee");
  }

  const handleCheckboxChange = (userID) => {
  setSelectedEmployees(userID);
  };

  function saveNewAssignment(userID) {
    const assignment = {
      project: {
        projectId: projectId,
      },
      assignedUser: {
        userID,
      },
      assignedByUser: {
        userID: pmId,
      },
      assignmentStatus: "Active",
    };

    console.log(assignment);

    addAssignment(assignment)
      .then((response) => {
        console.log("User addeded successfully : ");
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${selectedCount} employees added to the project`,
        });
      })
      .then(() => {
        navigator("/project/" + projectId + "/employee");
      })

      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      Swal.fire({
        icon: "info",
        title: "Do you want to assign selected employee(s)?",
        showCancelButton: true,
        confirmButtonText: "Add",
        customClass: {
          title: "my-swal-title", // Define your custom class name
        },
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Promise.all(selectedEmployees.map(saveNewAssignment))
            .then(() => {
              //Swal.fire("Saved!", "", "success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  }

  function validateForm() {
    return selectedEmployees.length > 0;
  }

  const isFormInvalid = !validateForm();

  function handlePopup() {
    // Create an array to hold the selected employee names
    const selectedEmployeeNames = selectedEmployees.map((userId) => {
      const selectedUser = availableUsers.find(
        (user) => user.userID === userId
      );
      return `
      <ul>
        <li class="py-1 sm:py-2 ">
          <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src="${
                    selectedUser.profilePicUrl
                      ? `http://localhost:8080/${selectedUser.profilePicUrl.replace(
                          /\\/g,
                          "/"
                        )}`
                      : ""
                  }"
                  alt=""
                ></img>
              </div>
              <div class="flex-1 min-w-0 text-left">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                ${selectedUser.firstName} ${selectedUser.lastName}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  ${selectedUser.designation}
                </p>
              </div>
              <div class="inline-flex items-center text-sm text-left font-semibold text-gray-900 dark:text-white">
                ${selectedUser.department}
              </div>
            </div>
          </li>
        
      
    </ul>
      `;
    });

    const selectedEmployeeListHTML = `<div>${selectedEmployeeNames.join(
      ""
    )}</div>`;

    // Trigger the popup with the selected employee names in list format
    Swal.fire({
      title: "Selected Employees",
      html: selectedEmployeeListHTML, // Use html property to render HTML content
      customClass: {
        title: "my-swal-title", // Define your custom class name
        confirmButton: "my-swal-confirm-button",
      },
    });
  }

  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
  };

  const filteredEmployees =
    selectedDesignation === "all"
      ? availableUsers
      : availableUsers.filter(
          (user) => user.designation === selectedDesignation
        );

  return (
    <>
      <section className="flex gap-6">
        <div className="w-screen m-3">
          <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
            <form className="space-y-4">
              <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
                <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">
                  Add Project Manager
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Project :
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="projectName"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      disabled
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Designation:
                  </label>
                  <div className="mt-3">
                    <select
                      id="designation"
                      name="designation"
                      value={selectedDesignation}
                      onChange={handleDesignationChange}
                      className="block w-full rounded-md border-0 p-1.5 h-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                    >
                      <option className="text-5rem" value="all">
                        Project Manager
                      </option>
                    
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="assignedUser"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Available Project Managers :{" "}
                  {selectedCount > 0 ? (
                    <span
                      className="cursor-pointer popup-trigger"
                      onClick={handlePopup}
                    >
                      <em className="font-normal">
                        ( {selectedCount} selected )
                      </em>
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <div className="mt-3">
                  <div>
                    <div>
                      <div className="p-0 bg-white border rounded-lg sm:pl-5 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className={`divide-y divide-gray-200 dark:divide-gray-700" pr-5 ${
                              filteredEmployees.length > 4
                                ? " overflow-y-auto"
                                : ""
                            }`}
                            style={{ height: "14.5rem", maxHeight: "14.5rem" }} // Set a fixed height for the container
                          >
                            {filteredEmployees.length === 0 ? (
                              <li className="py-1 text-center text-gray-500 sm:py-2">
                                <em>No available employees </em>
                              </li>
                            ) : (
                              filteredEmployees.map((user) => (
                                <li key={user.userID} className="py-1 sm:py-2 ">
                                  <div className="flex items-center space-x-4">
                                    <input
										type="radio"
										name="selectedEmployee"
										className="w-4 h-4 text-blue-500 form-radio"
										onChange={() =>
                                        handleCheckboxChange(user.userID)
                                      }
										checked={selectedEmployees === user.userID}
                                    />
                                    <option value="selected"></option>

                                    <div className="flex-shrink-0">
                                      <img
                                        className="w-8 h-8 rounded-full"
                                        src={
                                          user.profilePicUrl
                                            ? `http://localhost:8080/${user.profilePicUrl.replace(
                                                /\\/g,
                                                "/"
                                              )}`
                                            : ""
                                        } //https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                        alt="Neil image"
                                      ></img>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {user.firstName} {user.lastName}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {user.designation}
                                      </p>
                                    </div>
                                    <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                      {user.department}
                                    </div>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* End of Employee populated Area*/}
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-end mt-6 gap-x-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`text-white bg-[#001b5e] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                      isFormInvalid && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isFormInvalid}
                  >
                    Add Project Manager
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <style>
        {`
          .option-style {
            /* Add your custom styles here */
          }

          .my-swal-title {
            font-size: 1.3rem; /* Adjust the font size as desired */
            /* Add any other styles you want to apply */
          }

          my-swal-confirm-button {
            
          }
        `}
      </style>
    </>
  );
}

export default AddPm;
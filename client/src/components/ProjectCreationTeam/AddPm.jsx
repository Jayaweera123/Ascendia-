import React, { useEffect, useState } from "react";
import {
  getAllAvailableUsers,
  addAssignment,
} from "../../services/EmployeeService";
import { getProjectById } from "../../services/ProjectService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddPm() {
  const [projectName, setProjectName] = useState("");
  const [pmId, setPmId] = useState(null);
  const [designation, setDesignation] = useState("all");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  const projectId = 1; // Assuming projectId is 1 for example purposes

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (userId) {
      setPmId(userId);
    }
  }, []);

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
    getAllAvailableUsers()
      .then((response) => {
        if (response.data.length === 0) {
          setMessage("No available employees");
        } else {
          setMessage("");
          setAvailableUsers(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/project/" + projectId + "/employee");
  };

  const handleCheckboxChange = (userID) => {
    const index = selectedEmployees.indexOf(userID);
    if (index === -1) {
      setSelectedEmployees([...selectedEmployees, userID]);
      setSelectedCount(selectedCount + 1);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== userID));
      setSelectedCount(selectedCount - 1);
    }
  };

  const saveNewAssignment = (userID) => {
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

    addAssignment(assignment)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${selectedCount} employees added to the project`,
        });
      })
      .then(() => {
        navigate("/project/" + projectId + "/employee");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      Swal.fire({
        icon: "info",
        title: "Do you want to assign selected employee(s)?",
        showCancelButton: true,
        confirmButtonText: "Add",
      }).then((result) => {
        if (result.isConfirmed) {
          Promise.all(selectedEmployees.map(saveNewAssignment))
            .then(() => {
              // Success handling
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  const validateForm = () => {
    return selectedEmployees.length > 0;
  };

  const isFormInvalid = !validateForm();

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
      <section className="flex justify-start w-full gap-6 mt-8"> {/* Added margin-top */}
        <div className="w-full m-3">
          <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
                <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e]">
                  Add Employee
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Project:
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
                      <option value="all">All</option>
                      <option value="Site Engineer">Site Engineer</option>
                      <option value="Technical Officer">Technical Officer</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Store Keeper">Store Keeper</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="assignedUser"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Available Employees:
                </label>
                <div className="mt-3">
                  <div className="p-0 bg-white border rounded-lg sm:pl-5 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="pr-5 divide-y divide-gray-200 dark:divide-gray-700"
                        style={{ height: "14.5rem", maxHeight: "14.5rem" }}
                      >
                        {filteredEmployees.length === 0 ? (
                          <li className="py-1 text-center text-gray-500 sm:py-2">
                            <em>No available employees</em>
                          </li>
                        ) : (
                          filteredEmployees.map((user) => (
                            <li key={user.userID} className="py-1 sm:py-2">
                              <div className="flex items-center space-x-4">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-500 form-checkbox"
                                  onChange={() => handleCheckboxChange(user.userID)}
                                  checked={selectedEmployees.includes(user.userID)}
                                />
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
                                    }
                                    alt={`${user.firstName} ${user.lastName}`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {`${user.firstName} ${user.lastName}`}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.designation}
                                  </p>
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

              <div className="flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-gray-800 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
                    isFormInvalid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isFormInvalid}
                >
                  Add Selected Employees
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddPm;

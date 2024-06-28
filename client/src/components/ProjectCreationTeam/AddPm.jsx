import React, { useEffect, useState } from "react";
import {
  getAllAvailableUsers,
  addAssignment,
} from "../../services/EmployeeService";
import { getProjectById } from "../../services/ProjectService";
import { useNavigate, useParams } from "react-router-dom";
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

  const { projectId } = useParams(); // Get the projectId from the URL
  const navigate = useNavigate();

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

    return addAssignment(assignment);
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
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: `${selectedCount} employees added to the project`,
              }).then(() => {
                navigate("/project/" + projectId + "/employee");
              });
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Failed to add employees to the project",
              });
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
      <section className="flex justify-start w-full gap-6 mt-8">
        <div className="w-full m-3">
          <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  value={projectName}
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Designation
                </label>
                <select
                  id="designation"
                  className="block w-full mt-1 text-sm border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  value={selectedDesignation}
                  onChange={handleDesignationChange}
                >
                  <option value="all">All</option>
                  <option value="Role1">Role 1</option>
                  <option value="Role2">Role 2</option>
                  {/* Add more roles as needed */}
                </select>
              </div>

              {message && (
                <div className="p-4 mt-4 text-sm text-red-700 bg-red-100 rounded-lg">
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Available Employees
                </label>
                <div className="overflow-y-auto max-h-60">
                  {filteredEmployees.map((user) => (
                    <div key={user.userID} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-gray-800 border-gray-300 rounded focus:ring-gray-500"
                        onChange={() => handleCheckboxChange(user.userID)}
                        checked={selectedEmployees.includes(user.userID)}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {user.name} - {user.designation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-300 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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

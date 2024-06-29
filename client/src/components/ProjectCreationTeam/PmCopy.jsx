import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import SearchBar from "../../components/ProjectManager/SearchBar";
import PageTitle from "../../components/ProjectManager/PageTitle"; // Import the PageTitle component
import PreviousEmployeesButton from "../../components/ProjectManager/PreviousEmployeesButton"; // Import the PreviousEmployeesButton component
import {
  getAllEmployeesForProject,
  deleteAssignment,
  searchAssignment,
} from "../../services/EmployeeService";

function PmCopy({ projectId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllEmployeesForProject(projectId)
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
  };

  const filteredEmployees =
    selectedDesignation === "all"
      ? employees
      : employees.filter(
          (employee) =>
            employee.assignedUser.designation === selectedDesignation
        );

  const removeEmployee = (id) => {
    deleteAssignment(id)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Task deleted successfully!",
        }).then(() => {
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.id !== id)
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const popUpWarning = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure? You won't be able to revert this!",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        removeEmployee(id);
      } else {
        console.log("Employee Removal canceled");
      }
    });
  };

  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredEmployees.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (search !== "") {
      searchAssignment(projectId, search)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      getAllEmployeesForProject(projectId)
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [search]);

  return (
    <div className="w-full max-w-6xl p-10 mx-auto text-lg bg-white rounded-md shadow-md"> {/* Increased padding and width */}
     {/*  <PageTitle title="Project Manager Assignments" /> {/* Add the PageTitle component */}
      <div className="flex items-center justify-between pb-4">
        <SearchBar search={search} setSearch={setSearch} />
        <div className="flex items-center ml-4 space-x-4">
          <div className="relative flex items-center">
            <select
              className="border border-[#101D3F] text-[#101D3F] font-bold py-2 px-4 rounded-md"
              value={selectedDesignation}
              onChange={handleDesignationChange}
            >
              <option value="all">All</option>
              <option value="Civil Engineer">Project Manager</option>
              <option value="Technical Officer">General Manager</option>
            </select>
            <button
              className="px-4 py-2 ml-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
              onClick={() => alert('Add button clicked')}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* <PreviousEmployeesButton projectId={projectId} /> {/* Add the PreviousEmployeesButton component */}
      <div className="mt-8 overflow-x-auto"> {/* Add some margin top */}
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Name
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Department
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Contact
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Added on
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  <em>No Employees</em>
                </td>
              </tr>
            ) : (
              records.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-5 py-4 text-sm bg-white border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            employee.assignedUser.profilePicUrl
                              ? `http://localhost:8080/${employee.assignedUser.profilePicUrl.replace(
                                  /\\/g,
                                  "/"
                                )}`
                              : ""
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {employee.assignedUser.firstName}{" "}
                          {employee.assignedUser.lastName}
                        </p>
                        <p className="text-xs text-gray-600 whitespace-no-wrap">
                          {employee.assignedUser.designation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.assignedUser.department}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.assignedUser.contact}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatDate(employee.assignedUser.createdAt)}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {employee.assignedUser.status}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => popUpWarning(employee.id)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <nav>
          <ul className="flex">
            <li>
              <button
                className={`px-4 py-2 mx-1 text-gray-500 border rounded-md ${
                  currentPage === 1 ? "cursor-not-allowed" : ""
                }`}
                onClick={prePage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {numbers.map((num) => (
              <li key={num}>
                <button
                  className={`px-4 py-2 mx-1 text-gray-500 border rounded-md ${
                    currentPage === num ? "bg-gray-200" : ""
                  }`}
                  onClick={() => changeCurrentPage(num)}
                >
                  {num}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`px-4 py-2 mx-1 text-gray-500 border rounded-md ${
                  currentPage === numberOfPages ? "cursor-not-allowed" : ""
                }`}
                onClick={nextPage}
                disabled={currentPage === numberOfPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default PmCopy;

import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import {
  getAllEmployeesForProject,
  deleteAssignment,
  searchAssignment,
} from "../../services/EmployeeService";
import { RiDeleteBin6Line } from "react-icons/ri";

import Swal from "sweetalert2";
import SearchBar from "../../components/ProjectManager/SearchBar";

function PmCopy({ projectId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("all");
  const [search, setSearch] = useState("");

  //Get employees details
  useEffect(() => {
    // Fetch employees for the project when projectId changes
    getAllEmployeesForProject(projectId)
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  //select employees based on designation
  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
  };

  //filter selected employees
  const filteredEmployees =
    selectedDesignation === "all"
      ? employees
      : employees.filter(
          (employee) =>
            employee.assignedUser.designation === selectedDesignation
        );

  //remove employees
  function removeEmployee(id) {
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
  }

  //popups
  function popUpWarning(id) {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure? You won't be able to revert this!",
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          // If the user clicks "OK", call removeTask function
          removeEmployee(id);
        } else {
          // If the user clicks "Cancel" or closes the modal without confirming, do nothing
          console.log("Employee Removal canceled");
        }
      })
      .then(() => {});
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredEmployees.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(filteredEmployees.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  //Pagination
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

  //Search employee
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
      //if search is empty fetch all employees
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
    <div>
      <div className="bg-white rounded-md shadow-md p-7">
        <div className="flex items-center justify-between pb-4">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="flex items-center ml-4 space-x-4"> {/* Added margin-left */}
            <div className="relative">
              <select
                className="border border-[#101D3F] text-[#101D3F] font-bold py-2 px-4 rounded-md flex items-center"
                value={selectedDesignation}
                onChange={handleDesignationChange}
              >
                <option value="all">All</option>
                <option value="Civil Engineer">Site Engineer</option>
                <option value="Technical Officer">Technical Officer</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Store Keeper">Store Keeper</option>
              </select>
            </div>

            <button
              className="flex items-center px-4 h-10 py-2 mr-4 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            ></button>
          </div>
        </div>

        <div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              {filteredEmployees.length === 0 ? (
                <p className="py-1 text-center text-gray-500 sm:py-2">
                  <em>No Employees </em>
                </p>
              ) : (
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
                      <th className="text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((employee) => (
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
                                } //"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {employee.assignedUser.firstName}{" "}
                                {employee.assignedUser.lastName}
                              </p>
                              <p className="text-xs text-gray-600 whitespace-no-wrap">
                                {employee.assignedUser.designation}{" "}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {employee.assignedUser.department}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {employee.assignedUser.contact}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {formatDate(employee.assignedUser.createdAt)}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                            ></span>
                            <span className="relative">
                              {employee.assignedUser.status}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 text-sm text-right bg-white border-b border-gray-200">
                          <button
                            onClick={() => popUpWarning(employee.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-5 bg-white border-t xs:justify-end">
          <div className="flex justify-start">
            <button
              className="px-3 py-2 mr-2 text-sm font-medium text-gray-800 bg-gray-300 border border-gray-300 rounded-lg hover:bg-gray-400"
              onClick={prePage}
            >
              Previous
            </button>
            {numbers.map((n, i) => (
              <button
                key={i}
                className={`px-3 py-2 mr-2 text-sm font-medium border rounded-lg ${
                  currentPage === n
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
                onClick={() => changeCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              className="px-3 py-2 text-sm font-medium text-gray-800 bg-gray-300 border border-gray-300 rounded-lg hover:bg-gray-400"
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PmCopy;

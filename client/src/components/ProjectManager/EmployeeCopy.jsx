import React, { useState, useEffect } from "react";
import AddEmployeeButton from "./AddEmployeeButton";
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

function EmployeeCopy({ projectId }) {
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
      <div className="bg-white shadow-md p-7 rounded-md ">
        <div className="flex items-center justify-between pb-4">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="flex items-center space-x-4">
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

            <AddEmployeeButton projectId={projectId} />
          </div>
        </div>

        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {filteredEmployees.length === 0 ? (
                <p className="py-1 sm:py-2 text-center text-gray-500">
                  <em>No Assigned Employees </em>
                </p>
              ) : (
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Added on
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
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
                              <p className="text-gray-600 text-xs whitespace-no-wrap">
                                {employee.assignedUser.designation}{" "}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {employee.assignedUser.department}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {employee.assignedUser.phoneNumber}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {formatDate(employee.assignedDate)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {employee.assignmentStatus}
                            </span>
                          </span>
                        </td>
                        <td>
                          <RiDeleteBin6Line
                            className="text-slate-600 cursor-pointer"
                            onClick={() => popUpWarning(employee.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <button
                  className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none"
                  onClick={prePage}
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {/************************************************* Pagination *********************************************/}
                  {/*{numbers.map((n, i) => (
                    <button
                      className={`${
                        currentPage === n
                          ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200"
                          : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"
                      }`}
                      key={i}
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>*/}

                  <div className="text-sm text-gray-600">
                    Page{"    "}
                    <span className="px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200">
                      {currentPage}
                    </span>
                    {"    "}
                    of{"    "}
                    <span className="px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500">
                      {numberOfPages}
                    </span>
                  </div>
                </div>

                <button
                  className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none"
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>

            {/*<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
  </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCopy;

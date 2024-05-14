import React, { useState, useEffect } from "react";
import AddEmployeeButton from "./AddEmployeeButton";
import { FaFilter } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { MdOutlinePersonSearch } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { getAllEmploeesForProject } from "../../services/ProjectService";

function EmployeeCopy({ projectId }) {
  const [employees, setEmployees] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  useEffect(() => {
    // Fetch tasks for the project when projectId changes
    getAllEmploeesForProject(projectId)
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const filteredEmployees =
    selectedDesignation === "all"
      ? employees
      : employees.filter(
          (employee) =>
            employee.assignedUser.designation === selectedDesignation
        );

  return (
    <div>
      <div class="bg-white  p-8 rounded-md w-full">
        <div class="flex items-center justify-between pb-6">
          <div class="flex border border-gray-200 text-gray-400 bg-gray-50 items-center p-2 rounded-md">
            <IoSearch />
            <input
              class="bg-gray-50 outline-none ml-1 block flex-grow"
              type="text"
              name=""
              id=""
              placeholder="Search..."
            />
          </div>

          <div class="flex items-center space-x-4">
            <div class="relative">
              <select
                class="border border-[#101D3F] text-[#101D3F] font-bold py-2 px-4 rounded-md flex items-center"
                value={selectedDesignation}
                onChange={handleDesignationChange}
              >
                <FaFilter />
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
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Designation
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Added on
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 w-10 h-10">
                            <img
                              class="w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                              alt=""
                            />
                          </div>
                          <div class="ml-3">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {employee.assignedUser.firstName}{" "}
                              {employee.assignedUser.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {" "}
                          {employee.assignedUser.designation}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {employee.assignedUser.phoneNumber}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {formatDate(employee.assignedDate)}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">
                            {employee.assignmentStatus}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/*<div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span class="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
  </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCopy;

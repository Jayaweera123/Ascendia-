import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import { RiUserAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AssignPM = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // Function to handle the click event of the "Assign General Manager" button
  const handleAssignGeneralManager = () => {
    // Open the page to assign a general manager
    navigate("/assign-general-manager");
  };

  // Function to handle the click event of the "Assign Project Manager" button
  const handleAssignProjectManager = () => {
    // Open the page to assign a project manager
    navigate("/assign-project-manager");
  };

  return (
    <div>
    {/* Top Navigation Component */}
    <TopNavigation />

    {/* Main Section */}
    <section className="flex">
      {/* Side Navigation Component */}
      <SideNavigationPCTeam open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="relative w-screen bg-cover bg-zinc-50 h-fit">
        <div className="m-3 text-xl font-semibold text-gray-900">
          {/* Form for Assigning Employee */}
          <form method="POST" encType="multipart/form-data">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
                <RiUserAddFill size={50} color="#001b5e" />
                <div>
                  <h1 className="place-items-baseline py-2 text-3xl font-bold leading-relaxed text-left text-[#001b5e]">Assign Employee</h1>
                </div>
              </div>

              {/* Assign Project Manager Section */}
              <div className="relative m-32 overflow-x-auto bg-white rounded-lg shadow-md">
                  <div className="pb-12 border-b border-gray-900/10">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
                      {/* Project Manager Title */}
                      <div class="flex flex-col sm:col-span-8">
                        <div class=" flex justify-end mb-8 mt-8">
                          <h1 class="text-3xl font-bold">Assign Project Manager</h1>
                        </div>
                      </div>
        
                      {/* Form Inputs */}
                      <div className="flex flex-col mt-12 ml-24 sm:col-span-8">
                        {/* Project ID */}
                        <div>
                          <label htmlFor="Project-ID" className="block text-base font-medium leading-6 text-gray-900">
                            Project ID
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="project-id"
                              id="project-id"
                              autoComplete="given-Id"
                              readOnly
                              value="Auto-generated value"
                              className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
                            />
                          </div>
                        </div>
              
                        {/* Project Type */}
                        <div className="mt-8">
                          <label htmlFor="project-type" className="block text-base font-medium leading-6 text-gray-900">
                            Project Type
                          </label>
                          <div className="mt-2">
                            <select
                              id="project-type"
                              name="project-type"
                              autoComplete="off"
                              className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
                            >
                              <option value="" disabled selected>Select Project Type</option>
                              <option value="web">Web Development</option>
                              <option value="mobile">Mobile App Development</option>
                              <option value="design">Design Project</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
   
                        {/* Project Name */}
                        <div className="mt-8">
                          <label htmlFor="Project-Name" className="block text-base font-medium leading-6 text-gray-900">
                            Project Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="project-name"
                              id="project-name"
                              autoComplete="given-name"
                              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* Project Status */}
                        <div className="mt-8">
                          <label htmlFor="project-status" className="block text-base font-medium leading-6 text-gray-900">
                            Project Status
                          </label>
                          <div className="mt-2">
                            <select
                              id="project-status"
                              name="project-status"
                              autoComplete="off"
                              className="block w-1/2 h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                            >
                              <option value="" disabled selected>Select Project Status</option>
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Dates */}
                        <div class="mt-8 flex flex-wrap">
                          <div class="pr-4 sm:w-1/2">
                            <label for="added-date" class="block text-base font-medium leading-6 text-gray-900">
                              Started Date
                            </label>
                            <div class="mt-4">
                              <input
                                type="date"
                                name="added-date"
                                id="added-date"
                                autoComplete="added-date"
                                class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                              />
                            </div>
                          </div>
                          
                          <div class="sm:w-1/2 mt-4 sm:mt-0">
                            <label for="end-date" class="block text-base font-medium leading-6 text-gray-900">
                              Estimate End Date
                            </label>
                            <div class="mt-4">
                              <input
                                type="date"
                                name="end-date"
                                id="end-date"
                                autoComplete="end-date"
                                class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                              />
                            </div>
                          </div>
                        
 







  {/* Card */}
  


<div className="col-span-12 mt-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
  <div className="max-w-full p-4 bg-gray-100 rounded-lg shadow-md"> {/* Adjust max-w-full to extend the width */}
    <h3 className="mb-2 text-base font-bold">Find Project Manager</h3>
    
    {/* Search Component */}
    <form className="max-w-md mx-auto mt-4">
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative flex">
    <div className="relative flex-grow">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-2 pl-8 pr-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
        placeholder="Search Project Managers"
        required
      />
    </div>
    <button
      type="submit"
      className="px-5 py-1 text-sm font-bold text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Select
    </button>
  </div>
</form>

    {/* End of Search Component */}
    {/* Table Component */}
    
<table className="w-full mt-4 table-fixed">
  <thead>
    <tr>
      <th className="w-1/8 ">Project Manager</th> {/* Adjust width class to w-1/2 for half width */}
      <th className="w-1/4">Availability</th> {/* Adjust width class to w-1/4 for quarter width */}
      <th className="w-1/4">Select</th> {/* Adjust width class to w-1/4 for quarter width */}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="w-1/2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td className="w-1/4">Malcolm Lockyer</td>
      <td className="w-1/4">1961</td>
    </tr>
    <tr>
      <td className="w-1/2">Witchy Woman</td>
      <td className="w-1/4">The Eagles</td>
      <td className="w-1/4">1972</td>
    </tr>
    <tr>
      <td className="w-1/2">Shining Star</td>
      <td className="w-1/4">Earth, Wind, and Fire</td>
      <td className="w-1/4">1975</td>
    </tr>
  </tbody>
</table>
{/* End of Table Component */}

    <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Action</button>
  </div>
</div>


{/* End of Card */}


            
            <br></br>
            
            {/* Buttons for adding or deleting user */}
            <div className="flex items-center justify-end mt-6 mb-5 mr-5 gap-x-6">
              <button
                type="submit"
                className="px-3 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
              <button
                type="button"
                className="px-3 py-2 text-xl font-semibold leading-6 text-gray-900 bg-gray-200 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
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

export default AssignPM;
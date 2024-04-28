// Home.jsx
import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import { MdAssignmentAdd } from "react-icons/md";
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
    <TopNavigation />
      <section className="flex">
    <SideNavigation open={open} setOpen={setOpen} />
      <div class="relative bg-zinc-50 bg-cover h-fit w-screen">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <form method="POST" encType="multipart/form-data">
        <div className="space-y-5">
        <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
    <RiUserAddFill size={50} color="#001b5e"/>
          <div><h1 className="place-items-baseline py-2 text-3xl font-bold leading-relaxed text-left text-[#001b5e]">Assign Empployee</h1></div>
        </div>
                
                <div className="relative m-32 overflow-x-auto bg-white shadow-md rouwinded-lg">
                  <div className="border-b border-red-600 pb-80">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">   
                       
   <div class="flex flex-col sm:col-span-8">
        <div class=" flex justify-end mb-8 mt-8">
        <h1 class="text-3xl font-bold">Assign Project Manager</h1>
        </div>
    <div>
        
 
          
 <div className="flex flex-col mt-12 ml-24 sm:col-span-8">
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
            readOnly // Set the input field as read-only
            value="Auto-generated value" // Set the auto-generated value here
            className="block w-1/2 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
        />
    </div>
</div>

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


    <div className="mt-8">
              <label htmlFor="PhoneNo" className="block text-base font-medium leading-6 text-gray-900">
                Project Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneno."
                  id="phoneno."
                  autoComplete="given-no" 
                  className=" block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />  
              </div>
     </div>


    


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
            required //<!-- Add the required attribute if status selection is compulsory -->
        >
            <option value="" disabled selected>Select Project Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
        </select>
    </div>
</div>


   
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
</div>
  {/* Assign buttons */}
 





<div className="mt-8">
    <label htmlFor="project-status" className="block text-base font-medium leading-6 text-gray-900">
        Project Status
    </label>
    <div className="mt-2">
    
  {/* Card */}
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <div className="max-w-4xl p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="mb-2 text-xl font-medium">Find Pm /Gm </h3>
              
              {/* Search Component */}
                 <form className="max-w-md mx-auto mt-4">
                   <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                     <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Project Managers"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
              {/* End of Search Component */}

              
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Action</button>

            </div>
          </div>
          {/* End of Card */}
      </div>
</div>





</div>   
</div>
    
</div>
            
            <br></br>
            </div>                
      </div>
          


      <form className="w-full max-w-lg">
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label htmlFor="grid-first-name" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            First Name
          </label>
          <input id="grid-first-name" type="text" placeholder="Jane" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" />
          <p className="text-xs italic text-red-500">Please fill out this field.</p>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label htmlFor="grid-last-name" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            Last Name
          </label>
          <input id="grid-last-name" type="text" placeholder="Doe" className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
      </div>
      <div className="flex flex-wrap mb-6 -mx-3">
        <div className="w-full px-3">
          <label htmlFor="grid-password" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            Password
          </label>
          <input id="grid-password" type="password" placeholder="******************" className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" />
          <p className="text-xs italic text-gray-600">Make it as long and as crazy as you'd like</p>
        </div>
      </div>
      <div className="flex flex-wrap mb-2 -mx-3">
        <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label htmlFor="grid-city" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            City
          </label>
          <input id="grid-city" type="text" placeholder="Albuquerque" className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
        <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label htmlFor="grid-state" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            State
          </label>
          <div className="relative">
            <select id="grid-state" className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
              <option>New Mexico</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
          <label htmlFor="grid-zip" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
            Zip
          </label>
          <input id="grid-zip" type="text" placeholder="90210" className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
      </div>
    </form>


          


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
    </form>
  
  
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignPM;





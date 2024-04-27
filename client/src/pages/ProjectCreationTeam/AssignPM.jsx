import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiUserAddFill } from "react-icons/ri";

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
    <div className="relative flex justify-end m-32 overflow-x-auto bg-white rounded-lg shadow-md" style={{ maxWidth: "600px" }}>
    <TopNavigation />
      <section className="flex">
    <SideNavigation open={open} setOpen={setOpen} />
      <div class="relative bg-zinc-50 bg-cover h-fit w-screen">
    <section className="flex">
      <SideNavigation open={open} setOpen={setOpen} />
      <div className="relative w-screen bg-cover bg-zinc-50 h-fit">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <form method="POST" encType="multipart/form-data">
        <div className="space-y-5">
        <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
    <RiUserAddFill size={50} color="#001b5e"/>
          <div><h1 className="place-items-baseline py-2 text-3xl font-bold leading-relaxed text-left text-[#001b5e]">Assign Project Manager</h1></div>
        </div>
          <form method="POST" encType="multipart/form-data">
            <div className="space-y-5">
              <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
                <RiUserAddFill size={50} color="#001b5e" />
                <div>
                  <h1 className="place-items-baseline py-2 text-3xl font-bold leading-relaxed text-left text-[#001b5e]">Assign Project Manager</h1>
                </div>
              </div>
                
        <div className="relative flex justify-end overflow-x-auto bg-white rounded-lg shadow-md m-44" style={{ maxWidth: "800px", marginRight:"10px" }}>
    <div className="border-b border-red-600 pb-80">


@@ -83,23 +74,27 @@ const AssignPM = () => {


<div className="flex flex-col mt-12 ml-6 sm:col-span-8">
    <div className="flex">
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
                    className="block w-40 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:Lending-6"
                />
            </div>
<div className="flex">
    <div>
        <label htmlFor="Project-Type" className="block text-base font-medium leading-6 text-gray-900">
            Project Type
        </label>
        <div className="mt-2">
            <select
                id="project-type"
                name="project-type"
                autoComplete="off"
                className="block w-40 h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
                <option value="" disabled selected>Select Project Type</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="design">Design Project</option>
                <option value="other">Other</option>
            </select>
        </div>
    </div>
</div>

        <div className="ml-28"> {/* Reduced margin from ml-60 to ml-4 */}
            <label htmlFor="PhoneNo" className="block text-base font-medium leading-6 text-gray-900">

@@ -118,28 +113,6 @@ const AssignPM = () => {
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
            className="block w-1/2 h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

@@ -155,25 +128,6 @@ const AssignPM = () => {
              </div>
     </div>


     <div className="mt-8">
    <label htmlFor="comment" className="block text-base font-medium leading-6 text-gray-900">
        Project Description
    </label>
    <div className="mt-2">
        <textarea
            id="comment"
            name="comment"
            autoComplete="off" // Disable autocomplete for comments 
            rows="6" // Adjust the number of visible rows as needed 
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your project description here..."
        ></textarea>
    </div>
</div>



<div className="mt-8">
    <label htmlFor="project-status" className="block text-base font-medium leading-6 text-gray-900">
        Project Status

@@ -194,51 +148,6 @@ const AssignPM = () => {
        </select>
    </div>
</div>



{/*       
<div class="mt-4">
    <label for="image" class="block text-base font-medium leading-6 text-gray-900">
        Project Image
    </label>
    <div class="mt-2">
        <input
            type="file"
            id="image"
            name="image"
            accept="image/*" 
            class="block w-full py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
 </div>   */}   

<div class="mt-8">
    <label for="image" class="block text-base font-medium leading-6 text-gray-900">
        Project Image
    </label>
    <div class="mt-2 flex items-center">
        <div class="w-1/2"> 
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                class="block w-full  h-10 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div class="w-1/2 ml-4"> 
            <img src="" alt="Project Image" class="h-32 w-full object-cover rounded-md border border-gray-300 shadow-sm"></img>
        </div>
    </div>
</div>



       



      
<div class="mt-8 flex flex-wrap"> 
  <div class="pr-4 sm:w-1/2">


@@ -271,58 +180,20 @@ const AssignPM = () => {
    </div>
  </div>
</div>
  {/* Assign buttons */}
  <div className="mt-16">
  <button onClick={handleAssignGeneralManager} className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-green-700">
    Assign General Manager
  </button>
</div>
<div className="mt-8">
  <button onClick={handleAssignProjectManager} className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-green-700">
    Assign Project Manager
  </button>
</div>


</div>   
</div>
    
</div>
            
            <br></br>
            </div>                
      </div>
          

      </div>
    </div>
</div>

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
        </form>
      </div>
    </div>
  </section>
</div>

      
      </div>  
      
    </form>
  

          </div>
        </div>
      </section>
    </div>
  );
};

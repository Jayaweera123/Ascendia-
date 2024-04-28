// Home.jsx
import React, { useState } from "react"; //Usestate
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import { MdAssignmentAdd } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios  from "axios";// import axios for making http requests

const AddProject = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [projectId, setProjectId] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [createdDate, setCreatedDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to send project data to the server
  const saveProject = async (e) => {
    e.preventDefault();

    const project = {
      projectId,
      projectDescription,
      projectName,
      projectType,
      endDate,
      createdDate,
      projectStatus,
      projectImage,
    };

  try {
    // Send project data to the server
    const response = await axios.post(
      "http://localhost:8080/api/project/createProject",
      project
    );

    // Check response status
    if (response.status === 200) {
      console.log("Project created successfully!");
      // Optionally, redirect to another page after successful creation
      navigate("/projects");
    } else {
      console.error("Failed to create project");
    }
  } catch (error) {
    console.error("Error creating project:", error);
  }
};


const handleAssignGeneralManager = () => {
  navigate("/assign-general-manager");
};

const handleAssignProjectManager = () => {
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
    <MdAssignmentAdd size={90} color="#001b5e"/>
          <div><h1 className="place-items-baseline py-4 text-4xl font-bold leading-relaxed text-left text-[#001b5e]">Create Project</h1></div>
        </div>
                
                <div className="relative m-32 overflow-x-auto bg-white shadow-md rouwinded-lg">
                  <div className="border-b border-red-600 pb-80">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">   
                       
   <div class="flex flex-col sm:col-span-8">
   <div class=" flex justify-end mb-8 mt-8">
   <h1 class="text-4xl font-bold">Project Creation Form</h1>
   </div>
   <div>
        
 
          
  <div className="flex flex-col mt-12 ml-24 sm:col-span-8">
      <div>
        <label htmlFor="Project-ID" className="block text-base font-medium leading-6 text-gray-900">
           Project ID
        </label>
          <div className="mt-2">
           <input
             type="number"
             name="project-id"
             id="project-id"
             //autoComplete="given-Id"
             //readOnly // Set the input field as read-only
             value={projectId} // Use the state variablefor this value
             onChange={(e) => setProjectId(e.target.value)}
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
            type="text"
            name="project-type"
            autoComplete="off"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
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
    <label htmlFor="projectName" className="block text-base font-medium leading-6 text-gray-900">
      Project Name
    </label>
    <div className="mt-2">
      <input
          type="text"
          name="projectName"
          id="projectName"
          autoComplete="given-name"
          maxLength={200}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required // Make the input field required
      />  
      {/* Visual feedback for maximum length */}
      <p className="mt-1 text-sm text-gray-500">Maximum 200 characters</p>
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
           type="text"
           autoComplete="off"
           rows="6"
           value={projectDescription}
           onChange={(e) => setProjectDescription(e.target.value)}
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your project description here..."
        ></textarea>
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
           type="text"
           autoComplete="off"
           value={projectStatus}
           onChange={(e) => setProjectStatus(e.target.value)}
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
                onChange={(e) => setProjectImage(e.target.files[0])}
                className="block w-full h-10 py-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
           </div>
          <div class="w-1/2 ml-4"> 
          {projectImage && (
              <img src={URL.createObjectURL(projectImage)} alt="Project Image" className="object-cover w-full h-32 border border-gray-300 rounded-md shadow-sm"></img>
              )}
          </div>
      </div>
</div>



       

{/*started date and end date*/}    
  <div class="mt-8 flex flex-wrap"> 
   <div class="pr-4 sm:w-1/2">
     <label for="added-date" class="block text-base font-medium leading-6 text-gray-900">
       Started Date
      </label>
          <div className="mt-4"> 
            <input
              type="date"
              name="added-date"
              id="added-date"
              autoComplete="added-date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
            class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
            />
          </div>
     </div>
    <div class="sm:w-1/2 mt-4 sm:mt-0"> 
      <label for="end-date" class="block text-base font-medium leading-6 text-gray-900">
        Estimated End Date
      </label>
          <div class="mt-4"> 
           <input
              type="date"
              name="end-date"
              id="end-date"
              autoComplete="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
           class="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
           />
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
          


   {/* Buttons for create project */}
      <div className="flex items-center justify-end mt-6 mb-5 mr-5 gap-x-6">
      <button
            type="button"
            onClick={saveProject} // Call handleCreateProject when the button is clicked
            className="px-3 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
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

export default AddProject;
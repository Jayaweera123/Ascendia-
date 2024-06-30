import React, { useEffect, useState } from "react";
import { listMaterial, searchMaterial, deleteMaterial, getAllUpdatedMaterials } from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Store/SearchBar";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import NotificationBar from "../../components/Store/NotificationBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

function Material() {

  const [open, setOpen] = useState(true); // State for sidebar open/close

  const [material, setMaterial] = useState([]); // State for storing materials data

  const navigator = useNavigate(); // Navigation hook for routing

  const [search, setSearch] = useState(""); // State for search input

  // Retrieve and parse projectIDs from local storage
  const projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
  
  // Set a specific project ID (e.g., the first one)
  const givenProjectId = projectIDs ? projectIDs[0] : null;

  console.log('projectId', givenProjectId);

  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = material.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(material.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);
    
  // State for notification bar open/close
  const [isOpen, setIsOpen] = useState(false);
  
  // Handler function for notification bar status
  const notificationHandler = (status) => {
        setIsOpen(status);
  };

  // Fetch all materials on component mount
  useEffect(() => {
    getAllMaterials();
  }, []);

  // Function to fetch all materials
  const getAllMaterials = () => {
    listMaterial(givenProjectId)
      .then((response) => {
        setMaterial(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

   // Effect for searching materials based on search term
  useEffect(() => {
    if (search !== "") {
      searchMaterial(givenProjectId, search)
        .then((response) => {
          setMaterial(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      //if search bar is empty, get all materials
      listMaterial(givenProjectId)
        .then((response) => {
          setMaterial(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [search]);

  // Function to navigate to add material page
  const addNewMaterial = () => {
    navigator("/addMaterial");
  };

  // Function to navigate to edit material page
  const editMaterial = (id) => {
    navigator(`/editMaterial/${id}`);
  };

  // Function to navigate to update material page
  const updateMaterial = (id) => {
    navigator(`/updateMaterial/${id}`);
  };

  // Function to delete material
  const removeMaterial = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#001b5e',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMaterial(id)
            .then((response) => {
              getAllMaterials();
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your material has been deleted.',
                confirmButtonColor: '#001b5e'
              });
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You cannot delete this material',
                confirmButtonColor: '#001b5e'
              });
            });
        }
      });
    };
  
  // Function to navigate to previous page in pagination
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to change current page in pagination
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  // Function to navigate to next page in pagination
  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
        <TopNavigationStore notificationHandler={notificationHandler} />
        {isOpen && <NotificationBar isOpen={isOpen} notificationHandler={notificationHandler} />}
        
        <section className="flex">
            <SideNavigationStore open={open} setOpen={setOpen} />
      
            <div className="relative flex-auto w-8/12 h-screen">
  
                <div className="absolute top-0 left-0 pt-3 pl-10 ">
                    <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Material List</h1>
                </div>

                <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                    <div className="overflow-x-auto basis-full">
                        <div className="pt-3 pb-10 pl-10 pr-10 mr-10 bg-white rounded-lg shadow-md">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                
                                    {/* Search bar component */}
                                    <SearchBar search = {search} setSearch={setSearch}/>

                                    {/* Button to add new material */}
                                    <div className="mb-8">
                                        <button className="mt-6 bg-[#101d3f] hover:bg-sky-800 text-white font-bold py-2 px-4 rounded al " onClick={addNewMaterial}>
                                            <div className="flex items-center">
                                            <div className="flex items-center justify-center w-6 h-6 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                                </svg>
                                            </div>
                                            New Material
                                            </div>
                                        </button>
                                    </div>     
                            </div>
                            
                            {/* Table for displaying materials */}
                            <table className="min-w-full text-sm bg-white">
                                <thead>
                                    <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                                      <th className="px-4 py-5 text-left">Material Code</th>
                                      <th className="px-4 py-5 text-left">Material Name</th>
                                      <th className="px-4 py-5 text-left">Quantity</th>
                                      <th className="px-4 py-5 text-left">Measuring Unit</th>
                                      <th className="px-4 py-5 text-left">Description</th>
                                      <th className="w-16 px-4 py-5 text-left">Edit</th>
                                      <th className="w-16 px-4 py-5 text-left">Delete</th>
                                      <th className="w-16 px-4 py-5 text-left">Add/Issue</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {
                                        records
                                        .map(material =>
                                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={material.materialId}>
                                                <td className="px-4 py-3">{material.materialCode}</td>
                                                <td className="px-4 py-3">{material.materialName}</td>
                                                <td className="px-4 py-3">{material.quantity}</td>
                                                <td className="px-4 py-3">{material.measuringUnit}</td>
                                                <td className="px-4 py-3">
                                                    <div className="relative group">
                                                        {material.description.substring(0, 20)}...
                                                        <div className="absolute z-10 hidden px-2 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                        {material.description}
                                                        </div>
                                                    </div>
                                                </td>    

                                                {/******************************** Edit material **************************************/}
                                                <td className="px-5 py-3">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            type="button"
                                                            className="focus:outline-none text-neutral-700 dark:text-neutral-200 group-hover:opacity-70"
                                                            aria-label="Edit"
                                                            onClick={() => editMaterial(material.materialId)}
                                                        >
                                                            
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                                            </svg>

                                                        </button>
                                                        <div className="absolute hidden px-2 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                            Edit
                                                        </div>
                                                    </div>

                                                    
                                                </td>

                                                {/******************************** Delete material **************************************/}
                                                <td className="py-3 px-7">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            type="button"
                                                            className="focus:outline-none text-neutral-700 dark:text-neutral-200 group-hover:opacity-70"
                                                            aria-label="Edit"
                                                            onClick={() => removeMaterial(material.materialId)}
                                                        >
                                                            <RiDeleteBin6Line className="text-xl" />
                                                      
                                                        </button>
                                                        <div className="absolute hidden px-2 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                            Delete
                                                        </div>
                                                    </div>

                                                    
                                                </td>

                                                {/******************************** Update inventory **************************************/}
                                                <td className="px-10 py-3">
                                                    <div className="relative inline-block group">
                                                        <button
                                                            type="button"
                                                            className="focus:outline-none text-neutral-700 dark:text-neutral-200 group-hover:opacity-70"
                                                            aria-label="Edit"
                                                            onClick={() => updateMaterial(material.materialId)}
                                                        >

                                                        
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                                                            </svg>


                                                        </button>
                                                        <div className="absolute hidden px-2 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                            Add/Issue
                                                        </div>
                                                    </div>

                                                    
                                                </td>
                                            </tr>
                                        ) 
                                    }
                                </tbody>
                            </table>

                            <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                                <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={prePage}>
                                    Previous
                                </button>

                                    <div className="flex items-center gap-2">
                                        
                                    {/************************************************* Pagination *********************************************/}
                                        {
                                            numbers.map((n, i) => (
                                                <button className={ `${currentPage ===n ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200" : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"}`} key={i} onClick={() => changeCurrentPage(n)}>
                                                    {n}
                                                </button>

                                            ))
                                        
                                        }

                                        
                                    </div>

                                    <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={nextPage}>
                                        Next
                                    </button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>   
    
        </section>
      
    </div>
  );
}

export default Material;

import React, { useEffect, useState } from "react";
import { listMaterial } from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Store/SearchBar";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";

function Material() {

    const [open, setOpen] = useState(true);

    const [material, setMaterial] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listMaterial().then((response) => {
            setMaterial(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewMaterial(){
            navigator("/addMaterial")
    }

    function editMaterial(id){
        navigator(`/editMaterial/${id}`)
    }

  return (
    <div>
        <TopNavigationStore />
        <section className="flex">
            <SideNavigationStore open={open} setOpen={setOpen} />
      
            <div className="relative h-screen">
  
                <div className="absolute top-0 left-0 pt-3 pl-10">
                <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Material List</h1>
                </div>

                <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                    <div className="overflow-x-auto ">
                    <div className="pt-3 pb-10 pl-10 pr-10 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <SearchBar/>
                                <div className="mb-8">
                                    <button className="mt-6 bg-[#101d3f] hover:bg-sky-800 text-white font-bold py-2 px-4 rounded al " onClick={addNewMaterial}>
                                        <div className="flex items-center">
                                        <div className="flex items-center justify-center w-6 h-6 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                            </svg>
                                        </div>
                                        Add Material
                                        </div>
                                    </button>
                                </div>
                                {/* <SearchBar/> */}
                        </div>
                        <table className="min-w-full text-sm bg-white">
                            <thead>
                                <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                                <th scope="col" className="p-4"> </th>
                                <th className="px-4 py-5 text-left">Material Code</th>
                                <th className="px-4 py-5 text-left">Material Name</th>
                                <th className="px-4 py-5 text-left">Quantity</th>
                                <th className="px-4 py-5 text-left">Measuring Unit</th>
                                <th className="px-4 py-5 text-left">Description</th>
                                <th className="w-16 px-4 py-5 text-left"></th>
                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {
                                    material.map(material =>
                                        <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={material.materialId}>
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{material.materialCode}</td>
                                            <td className="px-4 py-3">{material.materialName}</td>
                                            <td className="px-4 py-3">{material.quantity}</td>
                                            <td className="px-4 py-3">{material.measuringUnit}</td>
                                            <td className="px-4 py-3">{material.description}</td>
                                            <td className="px-4 py-3">
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
                                                    <div className="absolute hidden px-4 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                        Edit
                                                    </div>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                    ) 
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>   
    

        
         
        </section>
      
    </div>
  )
}

export default Material

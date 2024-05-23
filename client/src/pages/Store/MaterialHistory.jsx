import React, { useEffect, useState } from "react";
import { getAllUpdatedMaterials } from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Store/SearchBar";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import { searchMaterial } from "../../services/StoreServices";

function Material() {

    const [open, setOpen] = useState(true);

    const [updatedMaterial, setUpdatedMaterial] = useState([]);

    const navigator = useNavigate();

    const [search, setSearch] = useState("");

    const givenProjectId = 3;


    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = updatedMaterial.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(updatedMaterial.length / recordsPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

    //Get all materials
    useEffect(() => {
        getAllUpdatedMaterials(givenProjectId).then((response) => {
            setUpdatedMaterial(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    // //Search materials
    // useEffect(() => {
    //     if (search !== "") {
    //         searchMaterial(givenProjectId, search).then(response => {
    //             setMaterial(response.data);
    //         }).catch(error => {
    //             console.error('There was an error!', error);
    //         });
    //     } else {
    //         //if search bar is empty, get all materials
    //         listMaterial(givenProjectId).then(response => {
    //             setMaterial(response.data);
    //         }).catch(error => {
    //             console.error('There was an error!', error);
    //         });
    //     }
    // }, [search]);

    const materialHistory = () => {
        navigator("/materialHistory")
}


    //Pagination
    const prePage = () => {
        if(currentPage !== 1 ){
            setCurrentPage(currentPage - 1)
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const nextPage = () => {
            if(currentPage !== numberOfPages ){
                setCurrentPage(currentPage + 1)
            }
    }

    
    
  return (
    <div>
        <TopNavigationStore />
        <section className="flex">
            <SideNavigationStore open={open} setOpen={setOpen} />
      
            <div className="relative h-screen">
  
                <div className="absolute top-0 left-0 pt-3 pl-10">
                <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">History</h1>
                </div>

                <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                    <div className="overflow-x-auto ">

                        <button
                            type="button"
                            onClick={materialHistory}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-tl-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                            Materials
                        </button>

                        <button
                            type="button"
                            //   onClick={handleCancel}
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-tr-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                            Equipment
                        </button>
                            
                    <div className="pt-3 pb-10 pl-10 pr-10 bg-white rounded-lg shadow-md">

                        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            
                                <SearchBar search = {search} setSearch={setSearch}/>
                                
                        </div> */}
                        <table className="min-w-full text-sm bg-white">
                            <thead>
                                <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                                
                                <th className="px-4 py-5 text-left">Material Code</th>
                                <th className="px-4 py-5 text-left">Material Name</th>
                                <th className="px-4 py-5 text-left">Updated Quantity</th>
                                <th className="px-4 py-5 text-left">Measuring Unit</th>
                                <th className="px-4 py-5 text-left">Updated Date</th>
                                <th className="w-16 px-4 py-5 text-left">Action</th>

                                </tr>
                            </thead>
                            <tbody className="text-blue-gray-900">
                                {
                                    records
                                    .map(updatedMaterial =>
                                        <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={updatedMaterial.materialId}>
                                            
                                            <td className="px-4 py-3">{updatedMaterial.materialCode}</td>
                                            <td className="px-4 py-3">{updatedMaterial.materialName}</td>
                                            <td className="px-4 py-3">{updatedMaterial.updatedQuantity}</td>
                                            <td className="px-4 py-3">{updatedMaterial.measuringUnit}</td>
                                            <td className="px-4 py-3">{updatedMaterial.updatedDate}</td>
                                            <td className="px-4 py-3">{updatedMaterial.action}</td>

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
  )
}

export default Material
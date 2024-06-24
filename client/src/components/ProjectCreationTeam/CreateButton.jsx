import react from React;

/*


<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>



<!-- Extracting component classes: -->
<button class="btn btn-blue">
  Button
</button>

<style>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>




<button
className="bg-[#101d3f] hover:bg-[#101d3fc2] text-white font-bold py-2 px-4 mt-5 rounded"
onClick={addNewTask}
>
<div className="flex items-center">
  <div className="flex items-center justify-center mr-2 ">
    <FaPlusCircle className="font-bold" />
  </div>
  Add Task
</div>
</button>





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/Store/SearchBar";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";

function Equipment() {
    const [open, setOpen] = useState(true);
    const [equipment, setEquipment] = useState([]);
    const navigator = useNavigate();
    const [search, setSearch] = useState("");
    const givenProjectId = 3;

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = equipment.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(equipment.length / recordsPerPage);
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

    // Get all equipment
    useEffect(() => {
        // Simulated API call to fetch equipment data
        const simulatedEquipmentData = [
            // Sample equipment data objects
            { equipmentId: 1, equipmentCode: "EQ001", equipmentName: "Equipment 1", quantity: 5, description: "Description 1" },
            { equipmentId: 2, equipmentCode: "EQ002", equipmentName: "Equipment 2", quantity: 10, description: "Description 2" },
            // Add more equipment objects as needed
        ];
        setEquipment(simulatedEquipmentData);
    }, []);

    // Search equipment
    useEffect(() => {
        if (search !== "") {
            // Simulated API call to search equipment
            const simulatedSearchResults = equipment.filter(item =>
                item.equipmentName.toLowerCase().includes(search.toLowerCase())
            );
            setEquipment(simulatedSearchResults);
        } else {
            // If search is empty, fetch all equipment
            // Simulated API call to fetch all equipment data
            const simulatedAllEquipmentData = [
                // Sample equipment data objects
                { equipmentId: 1, equipmentCode: "EQ001", equipmentName: "Equipment 1", quantity: 5, description: "Description 1" },
                { equipmentId: 2, equipmentCode: "EQ002", equipmentName: "Equipment 2", quantity: 10, description: "Description 2" },
                // Add more equipment objects as needed
            ];
            setEquipment(simulatedAllEquipmentData);
        }
    }, [search]);

    const addNewEquipment = () => {
        navigator("/addEquipment");
    };

    const editEquipment = (id) => {
        navigator(`/editEquipment/${id}`);
    };

    const updateEquipment = (id) => {
        navigator(`/updateEquipment/${id}`);
    };

    // Pagination functions
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

    return (
        <div>
            <TopNavigationStore />
            <section className="flex">
                <SideNavigationStore open={open} setOpen={setOpen} />
                <div className="relative h-screen">
                    <div className="absolute top-0 left-0 pt-3 pl-10">
                        <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Equipment List</h1>
                    </div>
                    <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                        <div className="overflow-x-auto ">
                            <div className="pt-3 pb-10 pl-10 pr-10 bg-white rounded-lg shadow-md">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <SearchBar search={search} setSearch={setSearch} />
                                    <div className="mb-8">
                                        <button className="mt-6 bg-[#101d3f] hover:bg-sky-800 text-white font-bold py-2 px-4 rounded al" onClick={addNewEquipment}>
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-6 h-6 mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                                    </svg>
                                                </div>
                                                Add Equipment
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <table className="min-w-full text-sm bg-white">
                                    <thead>
                                        <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                                            <th scope="col" className="p-4"> </th>
                                            <th className="px-4 py-5 text-left">Equipment Code</th>
                                            <th className="px-4 py-5 text-left">Equipment Name</th>
                                            <th className="px-4 py-5 text-left">Quantity</th>
                                            <th className="px-4 py-5 text-left">Description</th>
                                            <th className="w-16 px-4 py-5 text-left"></th>
                                            <th className="w-16 px-4 py-5 text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-blue-gray-900">
                                        {records.map(equipment =>
                                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={equipment.equipmentId}>
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => handleCheckboxChange(equipment.equipmentCode)} />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">{equipment.equipmentCode}</td>
                                                <td className="px-4 py-3">{equipment.equipmentName}</td>
                                                <td className="px-4 py-3">{equipment.quantity}</td>
                                                <td className="px-4 py-3">{equipment.description}</td>
                                                <td className="px-4 py-3">
                                                    <div className="relative inline-block group">
                                                        <button type="button" className="focus:outline-none text-neutral-700 dark:text-neutral-200 group-hover:opacity-70" aria-label="Edit" onClick={() => editEquipment(equipment.equipmentId)}>
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
                                                <td className="px-4 py-3">
                                                    <div className="relative inline-block group">
                                                        <button type="button" className="focus:outline-none text-neutral-700 dark:text-neutral-200 group-hover:opacity-70" aria-label="Update" onClick={() => updateEquipment(equipment.equipmentId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                        <div className="absolute hidden px-4 py-1 text-white bg-gray-800 rounded shadow-md group-hover:block">
                                                            Update
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                                    <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={prePage}>
                                        Previous
                                    </button>
                                    <div className="flex items-center gap-2">
                                        {numbers.map((n, i) => (
                                            <button className={`${currentPage === n ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200" : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"}`} key={i} onClick={() => changeCurrentPage(n)}>
                                                {n}
                                            </button>
                                        ))}
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

export default Equipment;
*/
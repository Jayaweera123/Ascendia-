import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import SearchBar from "../../components/Store/SearchBar";
import { FaDownload } from "react-icons/fa6";
import DateRangePickerComponent from "./DateRangePickerComponent";
import Swal from "sweetalert2";

function EquipmentHistoryComponent({ eRecords, ePrePage, eChangeCurrentPage, eNextPage, eCurrentPage, eNumberOfPages,
    search, setSearch ,action, setAction, value, setValue, updatedEquipment}) {
     
     // Generate an array of page numbers
    const numbers = [...Array(eNumberOfPages + 1).keys()].slice(1);
     // State for showing the date picker
    const [showDatePicker, setShowDatePicker] = useState(false);

     // Function to format date and time
     const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString(); // Format date
        const formattedTime = date.toLocaleTimeString(); // Format time
        return { formattedDate, formattedTime };
    };

    // Reference for the component to print
    const componentPDF = useRef();

    // Hook for generating PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Equipment History',
        onAfterPrint: () => {
            console.log('After print');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'PDF crated successfully!',
                confirmButtonColor: '#001b5e'
              })
        }
    });

    {console.log(componentPDF)}

    // Function to handle action change
    const handleActionChange = (e) => {
        const selectedAction = e.target.value;
        setAction(e.target.value);
        setShowDatePicker(selectedAction === "Filter By Date");
       
    };
    
    useEffect(() => {
        console.log(action);
      }, [action]);


    return (
        <div className="pt-3 pb-10 pl-10 pr-10 mr-10 bg-white rounded-lg shadow-md " style={{height:'38rem'}}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            
                            <SearchBar search = {search} setSearch={setSearch}/>

                            <div className="mb-1 mr-3">
                                <select
                                    value={action}
                                    onChange={handleActionChange}
                                    className="block w-full px-3 py-1.5 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="All History">All History</option>
                                    <option value="Filter By Date">Filter</option>
                                </select>
                            </div>

                            {/* Show date picker if action is "Filter By Date" */}
                            {showDatePicker && (
                    
                                <DateRangePickerComponent
                                value = {value} 
                                setValue = {setValue}/>
                             )}

                            {/* Button to generate PDF */}
                            <div className="mb-8">
                                <button className="mt-6 bg-[#101d3f] hover:bg-sky-800 text-white font-bold py-2 px-4 rounded al ml-3" onClick={generatePDF}>
                                    <div className="flex items-center">
                                    <div className="flex items-center justify-center w-6 h-6 mr-2">
                                    <FaDownload />
                                    </div>
                                    PDF
                                    </div>
                                </button>
                            </div>

                        
                    </div>

            {/* Table displaying equipment history */}
            <table className="min-w-full text-sm bg-white">
                <thead>
                    <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                        <th className="px-4 py-5 text-left">Equipment Code</th>
                        <th className="px-4 py-5 text-left">Equipment Name</th>
                        <th className="px-4 py-5 text-left">Updated Quantity</th>
                        <th className="px-4 py-5 text-left">Updated Date</th>
                        <th className="px-4 py-5 text-left">Updated Time</th>
                        <th className="w-16 px-4 py-5 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                    {
                        eRecords.map(updatedEquipment => {
                            const { formattedDate, formattedTime } = formatDateTime(updatedEquipment.updatedDate);
                            return (
                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={updatedEquipment.updatedEquipmentId}>
                                <td className="px-4 py-3">{updatedEquipment.equipmentCode}</td>
                                <td className="px-4 py-3">{updatedEquipment.equipmentName}</td>
                                <td className="px-4 py-3">{updatedEquipment.updatedQuantity}</td>
                                <td className="px-4 py-3">{formattedDate}</td>
                                <td className="px-4 py-3">{formattedTime}</td>
                                <td className="px-4 py-3">{updatedEquipment.action}</td>
                            </tr>
                                  );
                                })
                            }
                </tbody>
            </table>

        {/* Hidden component for printing PDF */}
        <div ref={componentPDF} style={{width:'100%'}} className="hidden w-full pt-20 pb-10 pl-20 pr-10 print:block">   

                    <div className="pb-5">
                        <h1 className="text-2xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">History of Add or Issure Equipment</h1>
                    </div>

            <table className="min-w-full text-sm bg-white">
                <thead>
                    <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                        <th className="px-4 py-5 text-left">Equipment Code</th>
                        <th className="px-4 py-5 text-left">Equipment Name</th>
                        <th className="px-4 py-5 text-left">Updated Quantity</th>
                        <th className="px-4 py-5 text-left">Updated Date</th>
                        <th className="px-4 py-5 text-left">Updated Time</th>
                        <th className="w-16 px-4 py-5 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                    {
                        updatedEquipment.map(updatedEquipment => {
                            const { formattedDate, formattedTime } = formatDateTime(updatedEquipment.updatedDate);
                            return (
                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={updatedEquipment.updatedEquipmentId}>
                                <td className="px-4 py-3">{updatedEquipment.equipmentCode}</td>
                                <td className="px-4 py-3">{updatedEquipment.equipmentName}</td>
                                <td className="px-4 py-3">{updatedEquipment.updatedQuantity}</td>
                                <td className="px-4 py-3">{formattedDate}</td>
                                <td className="px-4 py-3">{formattedTime}</td>
                                <td className="px-4 py-3">{updatedEquipment.action}</td>
                            </tr>
                                  );
                                })
                            }
                </tbody>
            </table>
        </div>


            {/* Pagination controls */}
            <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={ePrePage}>
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {
                        numbers.map((n, i) => (
                            <button className={`${eCurrentPage === n ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200" : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"}`} key={i} onClick={() => eChangeCurrentPage(n)}>
                                {n}
                            </button>
                        ))
                    }
                </div>

                <button className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none" onClick={eNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default EquipmentHistoryComponent;

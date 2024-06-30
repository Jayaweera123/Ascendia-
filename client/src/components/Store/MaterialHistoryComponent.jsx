import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import SearchBar from "./SearchBar";
import { FaDownload } from "react-icons/fa6";
import DateRangePickerComponent from "./DateRangePickerComponent";
import Swal from "sweetalert2";

function MaterialHistoryComponent({ records, prePage, changeCurrentPage, nextPage, 
    currentPage, numberOfPages, search, setSearch, action, setAction,
 value, setValue, updatedMaterial}) {

    // Create an array of numbers for pagination
    const numbers = [...Array(numberOfPages + 1).keys()].slice(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    //Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString(); // Format date
        const formattedTime = date.toLocaleTimeString(); // Format time
        return { formattedDate, formattedTime };
    };

    const componentPDF = useRef(); // Ref for the component to be printed

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Equipment History',
        onAfterPrint: () => {
            console.log('After print');
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'PDF created successfully!',
                confirmButtonColor: '#001b5e'
            });
        }
    });
    
    

    {console.log(componentPDF)}

    // Handle change in action selection
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
                <SearchBar search={search} setSearch={setSearch} />

                
                <div className="mb-1">
                    <select
                        value={action}
                        onChange={handleActionChange}
                        className="block w-full px-3 py-1.5 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="All History">All History</option>
                        <option value="Filter By Date">Filter</option>
                    </select>
                </div>
            
                 {showDatePicker && (
                    
                    <DateRangePickerComponent
                    value = {value} 
                    setValue = {setValue}/>
                )}
               
               {/* Downloard button*/}
                <div className="mb-8">
                    <button className="mt-6 bg-[#101d3f] hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" onClick={generatePDF}>
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-6 h-6 mr-2">
                                <FaDownload />
                            </div>
                             PDF
                        </div>
                    </button>
                </div>

            </div>

            {/* Main table displaying the material history */}
            <table className="min-w-full text-sm bg-white">
                <thead>
                    <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                        <th className="px-4 py-5 text-left">Material Code</th>
                        <th className="px-4 py-5 text-left">Material Name</th>
                        <th className="px-4 py-5 text-left">Updated Quantity</th>
                        <th className="px-4 py-5 text-left">Measuring Unit</th>
                        <th className="px-4 py-5 text-left">Updated Date</th>
                        <th className="px-4 py-5 text-left">Updated Time</th>
                        <th className="w-16 px-4 py-5 text-left">Action</th>
                    </tr>
                </thead>
                
                <tbody className="text-blue-gray-900">
                    {records.map(updatedMaterial => {
                        const { formattedDate, formattedTime } = formatDateTime(updatedMaterial.updatedDate);
                        return (
                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={updatedMaterial.updatedMaterialId}>
                                <td className="px-4 py-3">{updatedMaterial.materialCode}</td>
                                <td className="px-4 py-3">{updatedMaterial.materialName}</td>
                                <td className="px-4 py-3">{updatedMaterial.updatedQuantity}</td>
                                <td className="px-4 py-3">{updatedMaterial.measuringUnit}</td>
                                <td className="px-4 py-3">{formattedDate}</td>
                                <td className="px-4 py-3">{formattedTime}</td>
                                <td className="px-4 py-3">{updatedMaterial.action}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* For print pdf     */}
            <div ref={componentPDF} style={{width:'100%'}} className="hidden w-full pt-20 pb-10 pl-20 pr-10 print:block">   

                <div className="pb-5">
                    <h1 className="text-2xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">History of Add or Issure Materials</h1>
                </div>

                <table className="min-w-full text-sm bg-white">
                <thead>
                    <tr className="text-gray-700 border-b bg-blue-gray-100 border-blue-gray-50 border-y">
                        <th className="px-4 py-5 text-left">Material Code</th>
                        <th className="px-4 py-5 text-left">Material Name</th>
                        <th className="px-4 py-5 text-left">Updated Quantity</th>
                        <th className="px-4 py-5 text-left">Measuring Unit</th>
                        <th className="px-4 py-5 text-left">Updated Date</th>
                        <th className="px-4 py-5 text-left">Updated Time</th>
                        <th className="w-16 px-4 py-5 text-left">Action</th>
                    </tr>
                </thead>
                
                <tbody className="text-blue-gray-900">
                    {updatedMaterial.map(updatedMaterial => {
                        const { formattedDate, formattedTime } = formatDateTime(updatedMaterial.updatedDate);
                        return (
                            <tr className="bg-white border-b border-blue-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={updatedMaterial.updatedMaterialId}>
                                <td className="px-4 py-3">{updatedMaterial.materialCode}</td>
                                <td className="px-4 py-3">{updatedMaterial.materialName}</td>
                                <td className="px-4 py-3">{updatedMaterial.updatedQuantity}</td>
                                <td className="px-4 py-3">{updatedMaterial.measuringUnit}</td>
                                <td className="px-4 py-3">{formattedDate}</td>
                                <td className="px-4 py-3">{formattedTime}</td>
                                <td className="px-4 py-3">{updatedMaterial.action}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


        </div>

            {/* Pagination controls */}
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
    );
}

export default MaterialHistoryComponent;
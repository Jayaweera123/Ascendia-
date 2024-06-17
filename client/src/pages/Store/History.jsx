import React, { useEffect, useState } from "react";
import { getAllUpdatedEquipment, getAllUpdatedMaterials, searchUpdatedMaterial} from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import MaterialHistoryComponent from "../../components/Store/MaterialHistoryComponent";
import EquipmentHistoryComponent from "../../components/Store/EquipmentHistoryComponent";
import { searchUpdatedEquipment } from "../../services/StoreServices";

function History() {

    const [open, setOpen] = useState(true);
    const [updatedMaterial, setUpdatedMaterial] = useState([]);
    const [updatedEquipment, setUpdatedEquipment] = useState([]);
    const [activeTab, setActiveTab] = useState('material'); // State to manage active tab
    const [searchMaterial, setSearchMaterial] = useState("");
    const [searchEquipment, setSearchEquipment] = useState("");
    const [action, setAction] = useState('All History');
    const [value, setValue] = useState({ 

        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
        
        }); 
    const [eAction, setEAction] = useState('All History');
    const [eValue, setEValue] = useState({ 

        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
        
        }); 

    const navigator = useNavigate();
    const givenProjectId = 3;

    // Pagination for updated material table
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = updatedMaterial.slice(firstIndex, lastIndex);
    const numberOfPages = Math.ceil(updatedMaterial.length / recordsPerPage);

    // Pagination for updated equipment table
    const [eCurrentPage, setECurrentPage] = useState(1);
    const eRecordsPerPage = 5;
    const eLastIndex = eCurrentPage * eRecordsPerPage;
    const eFirstIndex = eLastIndex - eRecordsPerPage;
    const eRecords = updatedEquipment.slice(eFirstIndex, eLastIndex);
    const eNumberOfPages = Math.ceil(updatedEquipment.length / eRecordsPerPage);


    useEffect(() => {
        if(action === "All History"){
        getAllUpdatedMaterials(givenProjectId).then((response) => {
            const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            setUpdatedMaterial(sortedMaterial);
        }).catch(error => {
            console.error(error);
        })
    } else{
        getAllUpdatedMaterials(givenProjectId).then((response) => {
            const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            
            const filtered = sortedMaterial.filter(material => {
                const recordDate = new Date(material.updatedDate);
                const startDate = new Date(value.startDate);
                const endDate = new Date(value.endDate);
                endDate.setHours(23, 59, 59, 999);  // set endDate to the end of the day
                console.log(recordDate, startDate, endDate);
                return recordDate >= startDate && recordDate <= endDate;
            });
            
            console.log("filtered",filtered)
            setUpdatedMaterial(filtered);
        }).catch(error => {
            console.error(error);
        })
    }
    }, [action,value]);

    // // Get all updated equipment and sort by date
    // useEffect(() => {
    //     getAllUpdatedEquipment(givenProjectId).then((response) => {
    //         const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
    //         setUpdatedEquipment(sortedEquipment);
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }, []);

    useEffect(() => {
        if(eAction === "All History"){
        getAllUpdatedEquipment(givenProjectId).then((response) => {
            const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            setUpdatedEquipment(sortedEquipment);
        }).catch(error => {
            console.error(error);
        })
        
    } else{
        getAllUpdatedEquipment(givenProjectId).then((response) => {
            const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
            
            const filtered = sortedEquipment.filter(equipment => {
                const recordDate = new Date(equipment.updatedDate);
                const startDate = new Date(eValue.startDate);
                const endDate = new Date(eValue.endDate);
                endDate.setHours(23, 59, 59, 999);  // set endDate to the end of the day
                console.log(recordDate, startDate, endDate);
                return recordDate >= startDate && recordDate <= endDate;
            });
            
            console.log("filtered",filtered)
            setUpdatedEquipment(filtered);
        }).catch(error => {
            console.error(error);
        })
    }
    }, [eAction,eValue]);

    //Search updated materials
    useEffect(() => {
        if (searchMaterial !== "") {
            searchUpdatedMaterial(givenProjectId, searchMaterial).then(response => {
                const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedMaterial(sortedMaterial);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {
            //if search bar is empty, get all materials
            getAllUpdatedMaterials(givenProjectId).then(response => {
                const sortedMaterial = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedMaterial(sortedMaterial);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [searchMaterial]);

    // Search updated equipments
    useEffect(() => {
        if (searchEquipment !== "") {
            searchUpdatedEquipment(givenProjectId, searchEquipment).then(response => {
                const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedEquipment(sortedEquipment);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {
            // If search bar is empty, get all equipments
            getAllUpdatedEquipment(givenProjectId).then(response => {
                const sortedEquipment = response.data.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
                setUpdatedEquipment(sortedEquipment);
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }, [searchEquipment]);


    // Pagination for updated equipment table
    const ePrePage = () => {
        if (eCurrentPage !== 1) {
            setECurrentPage(eCurrentPage - 1);
        }
    }

    const eChangeCurrentPage = (id) => {
        setECurrentPage(id);
    }

    const eNextPage = () => {
        if (eCurrentPage !== eNumberOfPages) {
            setECurrentPage(eCurrentPage + 1);
        }
    }

    // Pagination for updated material table
    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    

    return (
        <div>
            <TopNavigationStore />
            <section className="flex">
                <SideNavigationStore open={open} setOpen={setOpen} />

                <div className="relative w-screen h-screen">
                    <div className="absolute top-0 left-0 pt-3 pl-10">
                        <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">History</h1>
                    </div>

                    <div className="flex justify-center min-h-screen mx-auto mt-20 ml-10 ">
                        <div className="overflow-x-auto basis-full">
                            <button
                                type="button"
                                onClick={() => setActiveTab('material')}
                                className={`py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${activeTab === 'material' ? 'bg-blue-200' : 'bg-white'} rounded-tl-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                            >
                                Materials
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('equipment')}
                                className={`py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none ${activeTab === 'equipment' ? 'bg-blue-200' : 'bg-white'} rounded-tr-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                            >
                                Equipment
                            </button>

                            {activeTab === 'material' && (
                                <MaterialHistoryComponent 
                                    records={records}
                                    prePage={prePage}
                                    changeCurrentPage={changeCurrentPage}
                                    nextPage={nextPage}
                                    currentPage={currentPage}
                                    numberOfPages={numberOfPages}
                                    search={searchMaterial}
                                    setSearch={setSearchMaterial}
                                    setValue={setValue}
                                    value={value}
                                    action={action}
                                    setAction={setAction}
                                    updatedMaterial={updatedMaterial}
                                />
                            )}


                            {activeTab === 'equipment' && (
                                <EquipmentHistoryComponent
                                    eRecords={eRecords}
                                    ePrePage={ePrePage}
                                    eChangeCurrentPage={eChangeCurrentPage}
                                    eNextPage={eNextPage}
                                    eCurrentPage={eCurrentPage}
                                    eNumberOfPages={eNumberOfPages}
                                    search={searchEquipment}
                                    setSearch={setSearchEquipment}
                                    value={eValue}
                                    setValue={setEValue}
                                    action={eAction}
                                    setAction={setEAction}
                                    updatedEquipment={updatedEquipment}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default History;

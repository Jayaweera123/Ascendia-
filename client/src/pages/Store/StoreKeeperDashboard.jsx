import React, { useState } from "react";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import DashboardCards from "../../components/Store/dashboard/DashboardCards";
import MaterialChart from "../../components/Store/dashboard/MaterialChart";
import NotificationBar from "../../components/Store/NotificationBar";
import LowStockMaterials from "../../components/Store/dashboard/LowStockMaterials";

 // Retrieve and parse projectIDs from local storage
 const projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
  
 // Set a specific project ID (e.g., the first one)
 const givenProjectId = projectIDs ? projectIDs[0] : null;

 console.log('projectId', givenProjectId);

function StoreKeeperDashboard() {

    const [open, setOpen] = useState(true); // State for sidebar open/close
  
    const [isOpen, setIsOpen] = useState(false); // State for notification bar open/close
  
    // Handler function for notification bar status
    const notificationHandler = (status) => {
        setIsOpen(status);
    };

  return (
    <>
       {/* Top navigation bar */}
      <TopNavigationStore notificationHandler={notificationHandler} />

       {/* Notification bar */}
      {isOpen && <NotificationBar isOpen={isOpen} notificationHandler={notificationHandler} />}
      
      <section className="flex">

        {/* Side navigation bar */} 
        <SideNavigationStore open={open} setOpen={setOpen} />
        <div className="relative flex-auto w-8/12 h-screen">
        
          <div className="mx-10 my-5">
              <div className="absolute top-0 left-0 pt-3 pl-10">
                            <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Dashboard</h1>
              </div>

        <div className="min-h-screen mx-auto mt-20">

              {/* Dashboard cards component */}
              <DashboardCards givenProjectId={givenProjectId}/>

             
            <div className="gap-5 lg:flex grow md:flex:none">
              <div className="py-5 lg:w-8/12">
                {/* Material chart component */}
                <MaterialChart givenProjectId={givenProjectId}/>
              </div>

              <div className="py-5 lg:w-8/12">
                {/* Low stock materials component */}
                <LowStockMaterials givenProjectId={givenProjectId} />
              </div>
              

            </div> 
          </div>
          </div>
        </div>
        
      </section>
    </>
  );
}

export default StoreKeeperDashboard;
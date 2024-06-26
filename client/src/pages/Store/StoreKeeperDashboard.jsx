import React, { useState } from "react";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import DashboardCards from "../../components/Store/dashboard/DashboardCards";
import MaterialChart from "../../components/Store/dashboard/MaterialChart";
import NotificationBar from "../../components/Store/NotificationBar";
import Notification from "../../components/Store/Notification";
import Test from "./Test";

 // Retrieve and parse projectIDs from local storage
 const projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
  
 // Set a specific project ID (e.g., the first one)
 const givenProjectId = projectIDs ? projectIDs[0] : null;

 console.log('projectId', givenProjectId);

function StoreKeeperDashboard() {

    const [open, setOpen] = useState(true);
  
    const [isOpen, setIsOpen] = useState(false);
  
    const notificationHandler = (status) => {
        setIsOpen(status);
    };

  return (
    <>
      <TopNavigationStore notificationHandler={notificationHandler} />
      {isOpen && <NotificationBar isOpen={isOpen} notificationHandler={notificationHandler} />}
      
      <section className="flex">

        <SideNavigationStore open={open} setOpen={setOpen} />
        <div className="relative flex-auto w-8/12 h-screen">
        
          <div className="mx-10 my-5">
              <div className="absolute top-0 left-0 pt-3 pl-10">
                            <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Dashboard</h1>
              </div>

        <div className="min-h-screen mx-auto mt-20">
              <DashboardCards givenProjectId={givenProjectId}/>

             
            <div className="gap-5 lg:flex grow md:flex:none">
              <div className="py-5 lg:w-8/12">
                <MaterialChart givenProjectId={givenProjectId}/>
              </div>

              <div className="py-5 lg:w-8/12">
                <MaterialChart />
              </div>
              

              {/*<div className="py-5 lg:w-4/12">
                <TasksPieChart projectId={projectId} />
              </div>*/}
            </div> 
          </div>
          </div>
        </div>

       
        
      </section>
    </>
  );
}

export default StoreKeeperDashboard;
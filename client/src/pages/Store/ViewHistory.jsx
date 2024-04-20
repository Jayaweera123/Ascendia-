import React, { useState } from "react";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";

//import InventoryTable from "../../components/Store/InventoryTable";

const ViewHistory = () => {
    const [open, setOpen] = useState(true);
    
  return (
    <div>
    <TopNavigationStore />
    <section className="flex">
      <SideNavigationStore open={open} setOpen={setOpen} />
      
    <div className="relative h-screen">
  
        <div className="absolute top-0 left-0 pt-3 pl-10">
        <h1 className="text-4xl leading-relaxed font-bold text-[#001b5e] whitespace-nowrap">View History</h1>
        </div>

        <div className="flex items-center justify-center min-h-screen bg-none">
        <div>
        {/* <InventoryTable/> */}
        </div>
        </div>
        
     
  </div>      
    </section>
  </div>
  );
};

export default ViewHistory;
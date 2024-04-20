import React, { useState } from "react";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";



const UpdateInventory = () => {
    const [open, setOpen] = useState(true);
    
  return (
    <div>
    <TopNavigationStore />
    <section className="flex">
      <SideNavigationStore open={open} setOpen={setOpen} />
      
    <div className="relative h-screen">
    
        <div className="absolute top-0 left-0 pt-3 pl-10">
          <h1 className="text-4xl leading-relaxed font-bold text-[#001b5e] whitespace-nowrap">Update Inventory</h1>
        </div>
     
  </div>      
    </section>
  </div>
  );
};

export default UpdateInventory;
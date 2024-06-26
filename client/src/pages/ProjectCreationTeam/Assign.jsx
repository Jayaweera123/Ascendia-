import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import AddPm from "../../components/ProjectCreationTeam/AddPm";

const Assign = () => {
    const [open, setOpen] = useState(true);
  
    return (
      <div>
        <TopNavigation />
        <section className="flex">
          <SideNavigationPCTeam open={open} setOpen={setOpen} />
          <div className="flex flex-col w-full">
            <div className="flex justify-start mt-8"> {/* Added margin-top */}
              <AddPm />
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Assign;
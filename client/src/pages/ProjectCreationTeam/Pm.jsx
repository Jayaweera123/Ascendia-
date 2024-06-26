import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import PmCopy from "../../components/ProjectCreationTeam/PmCopy";

const Pm = () => {
    const [open, setOpen] = useState(true);
  
    return (
      <div>
        <TopNavigation />
        <section className="flex">
          <SideNavigationPCTeam open={open} setOpen={setOpen} />
          <div className="flex flex-col w-full">
            <div className="flex justify-start mt-16 ml-44"> {/* Added margin-top */}
              <PmCopy />
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Pm;
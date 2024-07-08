import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import PmCopy from "../../components/ProjectCreationTeam/PmCopy";
import PageTitle from "../../components/ProjectCreationTeam/PageTitle";
import PreviousEmployeesButton from "../../components/ProjectCreationTeam/PreviousEmployeesButton";


const Pm = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full">
          <div className="flex justify-start mt-16 ml-44"> {/* Added margin-top */}
            <div className="mx-10 my-5">
              <div className="flex justify-between">
                <PageTitle title="Add Project Manager " />
                <div className="flex mb-4 space-x-4">
                  <PreviousEmployeesButton />
                
                </div>
              </div>
              <PmCopy />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pm;
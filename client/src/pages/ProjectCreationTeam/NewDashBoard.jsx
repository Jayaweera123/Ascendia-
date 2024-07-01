import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import StatusGrid from "../../components/ProjectCreationTeam/StatusGrid";
import TransactionChart from "../../components/ProjectCreationTeam/TransactionChart";
import ProjectStatusChart from '../../components/ProjectCreationTeam/ProjectStatusChart';

const NewDashBoard = () => {
  const [open, setOpen] = useState(true);

 
  return (
    <div>
      <TopNavigation />
      <section className="flex gap-6">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full gap-4">
          <StatusGrid />
          <div className="flex gap-4">
            <TransactionChart />
            <ProjectStatusChart />
          </div>
        </div>
      </section>
    </div>
  );
};
export default NewDashBoard;

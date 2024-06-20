import React, { useState } from "react";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import StatusGrid from "../../components/ProjectCreationTeam/StatusGrid";
import TransactionChart from "../../components/ProjectCreationTeam/TransactionChart";
import ProjectStatusChart from '../../components/ProjectCreationTeam/ProjectStatusChart';

const DashBoard = () => {
  const [open, setOpen] = useState(true);

 
  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex gap-6 mt-4">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
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
export default DashBoard;
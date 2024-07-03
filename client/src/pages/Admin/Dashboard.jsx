import React, { useState } from "react";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import StatusGrid from "../../components/Admin/StatusGrid";
import ProjectStatusChart from "../../components/Admin/ProjectStatusChart";
import OnlineUserList from "../../components/Admin/OnlineUsesList";

const DashBoard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex overflow-x-hidden overflow-y-hidden">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full gap-4">
          <StatusGrid />
          <div className="flex gap-4">
            <OnlineUserList />
            <ProjectStatusChart />
          </div>
        </div>
      </section>
    </div>
  );
};
export default DashBoard;

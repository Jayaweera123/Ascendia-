// Home.jsx
import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";

const AssignEmployee = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex gap-6">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
      </section>
    </div>
  );
};

export default AssignEmployee;

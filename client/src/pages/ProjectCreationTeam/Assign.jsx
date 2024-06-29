import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import AddPm from "../../components/ProjectCreationTeam/AddPm";

const Assign = () => {
  const { projectId } = useParams();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full p-8">
          <div className="flex justify-center">
            <AddPm projectId={projectId} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assign;

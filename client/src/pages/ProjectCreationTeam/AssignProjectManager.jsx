// src/pages/AssignProjectManager.jsx
import React, { useState } from 'react';
import TopNavigation from '../../components/TopNavigation';
import SideNavigation from '../../components/ProjectManager/SideNavigation';
import EmployeeTable from '../../components/ProjectCreationTeam/EmployeeTable';

const AssignProjectManager = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <TopNavigation />
      <section className="flex">
        <SideNavigation open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full">
          <div className="">
            <EmployeeTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssignProjectManager;

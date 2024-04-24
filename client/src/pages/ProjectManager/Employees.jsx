import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";

function Employees() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <PageTitle title="Employees" />
      </section>
    </>
  );
}

export default Employees;

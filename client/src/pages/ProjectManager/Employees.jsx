import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import EmployeeCard from "../../components/ProjectManager/EmployeeCard";
import AddEmployeeButton from "../../components/ProjectManager/AddEmployeeButton";
import { useParams } from "react-router-dom";
import EmployeeCopy from "../../components/ProjectManager/EmployeeCopy";

function Employees() {
  const { projectId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="ml-3.5 mt-10 w-9/12 flex-grow">
          <div className="flex justify-between mr-5">
            <PageTitle title="Employees" />
            {/*<AddEmployeeButton projectId={projectId} />*/}
          </div>

          {/* <EmployeeCard projectId={projectId} />*/}
          <EmployeeCopy projectId={projectId} />
        </div>
      </section>
    </>
  );
}

export default Employees;

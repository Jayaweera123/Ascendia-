import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import EmployeeCard from "../../components/ProjectManager/EmployeeCard";
import AddEmployeeButton from "../../components/ProjectManager/AddEmployeeButton";
import { useParams } from "react-router-dom";
import EmployeeCopy from "../../components/ProjectManager/EmployeeCopy";
import Example from "../../components/ProjectManager/example";
import PreviousEmployeesButton from "../../components/ProjectManager/PreviousEmployeesButton";

function Employees() {
  const { projectId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex ">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto">
          <div className="mx-10 my-5 ">
            <div className="flex justify-between">
              <PageTitle title="Employees" />
              {/*<AddEmployeeButton projectId={projectId} />*/}
              <PreviousEmployeesButton projectId={projectId} />
            </div>
            {/* <EmployeeCard projectId={projectId} />*/}
            <EmployeeCopy projectId={projectId} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Employees;

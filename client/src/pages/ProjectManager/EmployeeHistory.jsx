import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";
import EmployeeHistoryRecords from "../../components/ProjectManager/EmployeeHistoryRecords";

function EmployeeHistory() {
  const { projectId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto">
          <div className="mx-10 my-5 ">
            <div className="flex justify-between mb-2">
              <PageTitle title="Employee History" />
              {/*<AddEmployeeButton projectId={projectId} />*/}
            </div>

            {/* <EmployeeCard projectId={projectId} />*/}
            <EmployeeHistoryRecords projectId={projectId} />
          </div>
        </div>
      </section>
    </>
  );
}

export default EmployeeHistory;

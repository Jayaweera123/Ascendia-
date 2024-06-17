import React from "react";
import TopNavigationStore from "../../components/Store/TopNavigationStore";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import DashboardCards from "../../components/Store/dashboard/DashboardCards";
import MaterialChart from "../../components/Store/dashboard/MaterialChart";

const givenProjectId = 3;

function StoreKeeperDashboard() {
  return (
    <>
      <TopNavigationStore />
      <section className="flex">

        <SideNavigationStore />
        <div className="relative flex-auto w-8/12">
          <div className="mx-10 my-5">
              <div className="absolute top-0 left-0 pt-3 pl-10">
                            <h1 className="text-4xl leading-relaxed font-bold text-[#101d3f] whitespace-nowrap">Dashboard</h1>
              </div>

        <div className="min-h-screen mx-auto mt-20">
              <DashboardCards givenProjectId={givenProjectId}/>

             
            <div className="gap-5 lg:flex grow md:flex:none">
              <div className="py-5 lg:w-8/12">
                <MaterialChart givenProjectId={givenProjectId}/>
              </div>

              <div className="py-5 lg:w-8/12">
                <MaterialChart />
              </div>
              

              {/*<div className="py-5 lg:w-4/12">
                <TasksPieChart projectId={projectId} />
              </div>*/}
            </div> 
          </div>
          </div>
        </div>
        
      </section>
    </>
  );
}

export default StoreKeeperDashboard;
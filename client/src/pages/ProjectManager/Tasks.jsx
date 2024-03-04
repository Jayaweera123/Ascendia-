import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigation";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";

function Tasks() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <PageTitle title="Tasks" />
      </section>
    </>
  );
}

export default Tasks;

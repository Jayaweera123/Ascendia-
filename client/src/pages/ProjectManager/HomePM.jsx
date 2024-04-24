import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigationPM";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import DeleteModal from "../../components/ProjectManager/DeleteModal";

function HomePM() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <div>
          <PageTitle title="Home" />
          <DeleteModal />
        </div>
      </section>
    </>
  );
}

export default HomePM;

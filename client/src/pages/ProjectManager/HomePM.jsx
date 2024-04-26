import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import DeleteModal from "../../components/ProjectManager/DeleteModal";

function HomePM() {
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />
        <div>
          <PageTitle title="Home" />
          <DeleteModal />
        </div>
      </section>
    </>
  );
}

export default HomePM;

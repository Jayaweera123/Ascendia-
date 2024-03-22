import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigationPM";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";
import DeleteModal from "../../components/Nethuni/DeleteModal";

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

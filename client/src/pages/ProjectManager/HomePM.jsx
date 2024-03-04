import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigationPM";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";

function HomePM() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <PageTitle title="Home" />
      </section>
    </>
  );
}

export default HomePM;

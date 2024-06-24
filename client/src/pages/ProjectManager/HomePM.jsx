import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import { useParams } from "react-router-dom";

function HomePM() {
  //Get the pm id form the URL.
  //PM id of the person who has logges in is needed.
  const { pmId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM pmId={pmId} />
        <div>
          <PageTitle title="Home" />
        </div>
      </section>
    </>
  );
}

export default HomePM;

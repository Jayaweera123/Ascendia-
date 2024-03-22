import React from "react";
import SideNavigation from "../../components/Nethuni/SideNavigation";
import TopNavigation from "../../components/Nethuni/TopNavigation";
import PageTitle from "../../components/Nethuni/PageTitle";
import TaskCard from "../../components/Nethuni/TaskCard";
import { Link } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddButton from "../../components/Nethuni/AddButton";

function Tasks() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <div className="ml-3.5 mt-10">
          <div></div>
          <div className="flex justify-between m-0">
            <PageTitle title="Tasks" />
            <AddButton />
          </div>

          <TaskCard />
        </div>
      </section>
    </>
  );
}

export default Tasks;

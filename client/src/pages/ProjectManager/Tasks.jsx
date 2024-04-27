import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import TaskCard from "../../components/ProjectManager/TaskCard";
import { Link } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddButton from "../../components/ProjectManager/AddButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

function Tasks() {
  return (
    <>
      <TopNavigation />
      <section className="flex">
        <SideNavigation />
        <div className="ml-3.5 mt-10">
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

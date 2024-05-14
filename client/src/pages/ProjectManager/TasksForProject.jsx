import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import TaskCard from "../../components/ProjectManager/TaskCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddButton from "../../components/ProjectManager/AddButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

function TasksForProject() {
  const { projectId } = useParams();

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="ml-3.5 mr-3.5 mt-10 w-9/12 flex-grow">
          <div className="flex justify-between m-0">
            <PageTitle title="Tasks" />
            <div className=""></div>
            <AddButton projectId={projectId} />
          </div>
          <div ClassName="flex-grow">
            <TaskCardforProject projectId={projectId} />
          </div>
        </div>
      </section>
    </>
  );
}

export default TasksForProject;

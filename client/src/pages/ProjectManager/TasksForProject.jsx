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
import SearchBar from "../../components/ProjectManager/SearchBar";

function TasksForProject() {
  const { projectId } = useParams();

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />
        <div className="flex-auto w-8/12">
          <div className="mx-10 my-5">
            <div className="flex justify-between">
              <PageTitle title="Tasks" />
            </div>
            <div className="flex-grow">
              <TaskCardforProject projectId={projectId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TasksForProject;

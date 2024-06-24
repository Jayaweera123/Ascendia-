import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import AddTaskForm from "../../components/ProjectManager/AddTaskCopyCopy";

import { useParams } from "react-router-dom";

const AddTask = () => {
  const { projectId } = useParams();

  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM projectId={projectId} />

        <div className="w-8/12 ml-3.5 mr-3.5 mt-5 flex-grow">
          <AddTaskForm projectId={projectId} />
        </div>
      </section>
    </>
  );
};

export default AddTask;

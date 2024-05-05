import React from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import AddTaskForm from "../../components/ProjectManager/AddTaskCopyCopy";
import EditTaskForm from "../../components/ProjectManager/EditTaskForm";
import { useParams } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  return (
    <>
      <TopNavigationPM />
      <section className="flex">
        <SideNavigationPM />

        <div className="w-8/12 ml-3.5 mr-3.5 mt-5 flex-grow">
          <EditTaskForm id={taskId} />
        </div>
      </section>
    </>
  );
};

export default EditTask;

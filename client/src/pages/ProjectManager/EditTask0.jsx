import React, { useState, useEffect } from "react";
import SideNavigationPM from "../../components/ProjectManager/SideNavigation";
import TopNavigationPM from "../../components/ProjectManager/TopNavigationPM";
import PageTitle from "../../components/ProjectManager/PageTitle";
import AddTaskForm from "../../components/ProjectManager/AddTaskCopyCopy";
import EditTaskForm from "../../components/ProjectManager/EditTaskForm";
import { useParams, useLocation } from "react-router-dom";

const EditTask0 = () => {
  const { taskId, projectId } = useParams();
  const location = useLocation();

  // Log the taskId and projectId to the console
  console.log(taskId);
  console.log(projectId);

  // Define navigators based on the previous page
  const navigator1 = "/project/" + projectId + "/task";
  const navigator2 = "/task/" + taskId + "/job";

  return (
    <>
      <TopNavigationPM />

      <section className="flex">
        <SideNavigationPM projectId={projectId} />

        <div className="w-8/12 ml-3.5 mr-3.5 mt-5 flex-grow">
          <EditTaskForm id={taskId} prePageNavigator={navigator1} />
        </div>
      </section>
    </>
  );
};

export default EditTask0;

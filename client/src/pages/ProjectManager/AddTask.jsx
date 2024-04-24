import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import AddTaskForm from "../../components/ProjectManager/AddTaskForm";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const { id } = useParams();
  return (
    <>
      <TopNavigation />
      <section className="flex w-full">
        <SideNavigation />
        <div className="w-8/12 ml-3.5 mt-10">
          <PageTitle title={id ? "Update Task" : "Add Task"} />
          <br />
          <br />
          <AddTaskForm />
        </div>
      </section>
    </>
  );
};

export default AddTask;

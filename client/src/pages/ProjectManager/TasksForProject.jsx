import React from "react";
import SideNavigation from "../../components/ProjectManager/SideNavigation";
import TopNavigation from "../../components/ProjectManager/TopNavigation";
import PageTitle from "../../components/ProjectManager/PageTitle";
import TaskCard from "../../components/ProjectManager/TaskCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { BsClipboard2PlusFill } from "react-icons/bs";
import AddButton from "../../components/ProjectManager/AddButton";
import TaskCardforProject from "../../components/ProjectManager/TaskCard copy";

//function TasksForProject({ projectId }) {
function TasksForProject() {
  const { projectId } = useParams();
  /* const [projectId, setProjectId] = useState(null);

  // Extract projectId from URL params
  const { projectId: urlProjectId } = useParams();

  useEffect(() => {
    // Set projectId state
    setProjectId(urlProjectId);
  }, [urlProjectId]);*/
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

          <TaskCardforProject projectId={projectId} />
        </div>
      </section>
    </>
  );
}

export default TasksForProject;

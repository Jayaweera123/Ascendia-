import React, { useEffect, useState } from "react";
import { getEditHistoryForTask } from "../../services/TaskService";
import EditHistoryPopUp from "./EditHistoryPopUp";

const EditHistoy = ({ taskId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getEditHistoryForTask(taskId)
      .then((response) => {
        setRecords(response.data);
        console.log(records);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  return (
    <>
      <div className="">
        <EditHistoryPopUp records={records} />
      </div>
    </>
  );
};

export default EditHistoy;

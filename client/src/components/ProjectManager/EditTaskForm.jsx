import React, { useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../../services/TaskService";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../services/ProjectService";

function EditTaskForm({ id, prePageNavigator }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pID, setPID] = useState(""); // State for project ID
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");

  const [updatedByUserId, setUpdatedByUserId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    if (userId) {
      setUpdatedByUserId(userId);
    }
  }, []);

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((response) => {
          setTaskName(response.data.taskName);
          setDescription(response.data.description);
          setStartDate(response.data.startDate || ""); // Ensure not null
          setEndDate(response.data.endDate);
          setPID(response.data.project.projectId); // Set project ID
          setProjectStartDate(response.data.project.createdDate);
          setProjectEndDate(response.data.project.endDate);
          console.log(response.data);
          console.log(projectStartDate, projectEndDate);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  //save task in the backend-> database
  function saveNewTask(e) {
    e.preventDefault();

    if (validateForm()) {
      const task = {
        taskName,
        description,
        endDate,
        updatedByUserId,
      };

      // Add startDate only if it is provided
      if (startDate) {
        task.startDate = startDate;
      }

      console.log(task);

      if (id) {
        updateTask(id, task)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Task updated successfully!",
            }).then(() => {
              navigator(prePageNavigator /*"/project/" + pID + "/task"*/);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      //clearForm();
    }
  }

  //get Project start date end date
  /*useEffect(() => {
    getProjectById(pID)
      .then((response) => {
        console.log(response.data);
        setProjectStartDate(response.data.createdDate);
        setProjectEndDate(response.data.endDate);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array*/

  function clearForm() {
    setTaskName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  function handleCancel(e) {
    navigator(prePageNavigator); //navigator("/project/" + pID + "/task");
  }

  /*const isEndDateInPast = new Date(endDate) < new Date();
  const isEndDateInPast = new Date(endDate) < new Date();*/

  // Determine if the form is invalid
  const isFormInvalid =
    !taskName ||
    !endDate ||
    !description ||
    description.trim().length === 0 ||
    (endDate && startDate && endDate < startDate) ||
    (endDate && startDate && endDate === startDate) ||
    (startDate && startDate < projectStartDate) ||
    (endDate && projectStartDate > endDate) ||
    (startDate &&
      new Date(startDate) <= new Date(new Date().setHours(0, 0, 0, 0))) ||
    endDate > projectEndDate ||
    description.length > 999 ||
    taskName.length > 99;

  //Form validation
  function validateForm() {
    return true;
  }

  function formTitle() {
    if (id) {
      return (
        <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">
          Edit Task
        </h4>
      );
    } else {
      return (
        <h4 className="text-4xl leading-relaxed font-bold text-left text-[#001b5e] ">
          Add Task
        </h4>
      );
    }
  }

  return (
    <div>
      <section className="flex gap-6">
        <div className="w-screen m-3">
          <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
            <form className="space-y-4">
              <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
                {formTitle()}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="taskName"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Task Name:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter task name"
                      name="taskName"
                      id="taskName"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {/* Conditional rendering to display the required message */}
                    {taskName.trim().length === 0 && (
                      <span className="mt-2 text-sm text-red-500"></span>
                    )}
                    {/* Error message */}
                    {taskName.length > 99 && (
                      <span className="mt-2 text-sm text-red-500">
                        Task name can't be more than 100 characters
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Start Date:
                  </label>
                  <div className="mt-3">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {/* Conditional rendering to display the required message */}
                    {/*startDate.trim().length === 0 && (
                      <span className="mt-2 text-sm text-red-500"></span>
                    )*/}
                    {endDate && startDate && endDate < startDate && (
                      <span className="mt-2 text-sm text-red-500">
                        Start date must be before end date.
                      </span>
                    )}
                    {startDate && projectStartDate > startDate && (
                      <span className="mt-2 text-sm text-red-500">
                        Invalid start date: the project start date is{" "}
                        {projectStartDate}.
                      </span>
                    )}
                    {startDate &&
                      new Date(startDate) <=
                        new Date(new Date().setHours(0, 0, 0, 0)) && (
                        <span className="mt-2 text-sm text-red-500">
                          Start date must be today or a future date.
                        </span>
                      )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Description:
                  </label>
                  <div className="mt-3">
                    <textarea
                      name="description"
                      placeholder="Enter task discription"
                      id="description"
                      value={description}
                      maxLength={1000} // Limit the number of characters
                      onChange={(e) => setDescription(e.target.value)}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-24"
                    />
                    {/* Conditional rendering to display the required message */}
                    {description.trim().length === 0 && (
                      <span className="mt-2 text-sm text-red-500"></span>
                    )}
                    {/* Error message */}
                    {description.length > 999 && (
                      <span className="mt-2 text-sm text-red-500">
                        Description limited to 1000 characters.{" "}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    End Date:
                  </label>
                  <div className="mt-3">
                    <input
                      type="date"
                      placeholder="Enter Minimum Level"
                      name="endDate"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {endDate.trim().length === 0 && (
                      <span className="mt-2 text-sm text-red-500"></span>
                    )}
                    {/* Additional conditional rendering to display error if due date is before start date */}
                    {endDate && startDate && endDate < startDate && (
                      <span className="mt-2 text-sm text-red-500">
                        End date must be after start date.
                      </span>
                    )}
                    {endDate && projectEndDate < endDate && (
                      <span className="mt-2 text-sm text-red-500">
                        Invalid end date: the project shoulbe done by{" "}
                        {projectEndDate}.
                      </span>
                    )}
                    {endDate && projectStartDate > endDate && (
                      <span className="mt-2 text-sm text-red-500">
                        Invalid end date: Project starts in be end in{" "}
                        {projectEndDate}
                      </span>
                    )}
                    {endDate && startDate && startDate == endDate && (
                      <span className="mt-2 text-sm text-red-500">
                        Invalid end date.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end mt-6 gap-x-6">
                <button
                  type="submit"
                  onClick={saveNewTask}
                  className={`text-white bg-[#001b5e] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                    isFormInvalid && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={isFormInvalid}
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditTaskForm;

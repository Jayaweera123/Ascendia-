import React, { useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../../services/TaskService";
import { useNavigate, useParams } from "react-router-dom";

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTask(id)
        .then((response) => {
          setTaskName(response.data.taskName);
          setDescription(response.data.description);
          setStartDate(response.data.startDate);
          setEndDate(response.data.endDate);
          setStatus(response.data.status);
        })
        .catch((error) => {
          console.error(error);
          //can redirect to error page
        });
    }
  }, [id]);

  function saveNewTask(e) {
    e.preventDefault();

    // Calculate task status
    let newStatus;
    const currentDate = new Date();
    console.log(currentDate);
    const startDateObj = new Date(startDate);
    console.log(startDateObj);
    const endDateObj = new Date(endDate);
    console.log(endDateObj);

    if (endDateObj < currentDate) {
      newStatus = "OverDue";
    } else if (startDateObj > currentDate) {
      newStatus = "Upcoming";
    } else {
      newStatus = "Ongoing";
    }

    // Create task object with the updated status
    const task = {
      taskName,
      description,
      startDate,
      endDate,
      status: newStatus,
    };
    console.log(task);

    if (id) {
      console.log("Inside the update");
      console.log(task);
      updateTask(id, task)
        .then((response) => {
          console.log(response.data);
          navigator("/tasks");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createTask(task)
        .then((response) => {
          console.log(response.data);
          navigator("/tasks");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    clearForm();
  }

  function clearForm() {
    setTaskName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  // Determine if the form is invalid
  const isFormInvalid =
    !taskName ||
    !startDate ||
    !endDate ||
    endDate < startDate ||
    description.length > 999 ||
    taskName.length > 99;

  function formTitle() {
    if (id) {
      return (
        <h2 className="mb-5 text-3xl font-bold text-center text-sky-950">
          Edit Task
        </h2>
      );
    } else {
      return (
        <h2 className="mb-5 text-3xl font-bold text-center text-sky-950">
          Create Task
        </h2>
      );
    }
  }

  function CancelOrClearButton() {
    if (id) {
      return (
        <button
          type="button"
          onClick={() => navigator("/tasks")} // Corrected
          className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={clearForm}
          className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          Clear
        </button>
      );
    }
  }

  return (
    <>
      <div className="justify-center min-h-screen md:px-20">
        <div className="w-full px-6 py-10 mx-auto bg-white rounded-md shadow-xl ">
          {formTitle()}

          {/* Input fields */}
          <form>
            {/* Task Title */}
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="pr-4 font-sans text-base font-semibold text-gray-800"
              >
                Title:
              </label>
              <input
                type="text"
                placeholder="Task name"
                id="taskName"
                name="taskName"
                required
                value={taskName}
                maxLength={100}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-2 py-1 text-base text-gray-900 border-2 border-gray-300 rounded-md outline-none bg-gray-50 focus:border-sky-300"
              />
              {/* Conditional rendering to display the required message */}
              {taskName.trim().length === 0 && (
                <span className="mt-2 text-sm text-red-500">*required</span>
              )}
              {/* Error message */}
              {taskName.length > 99 && (
                <span className="mt-2 text-sm text-red-500">
                  Description can't be more than 100 characters
                </span>
              )}
            </div>

            {/* Task Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="pr-4 font-sans text-base font-semibold text-gray-800"
              >
                Description:
              </label>
              <textarea
                placeholder="Task description"
                id="description"
                name="description"
                value={description}
                maxLength={1000} // Limit the number of characters
                required
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 px-2 py-1 text-base text-gray-900 border-2 border-gray-300 rounded-md outline-none resize-none bg-gray-50 focus:border-sky-300"
              ></textarea>
              {/* Conditional rendering to display the required message */}
              {description.trim().length === 0 && (
                <span className="mt-2 text-sm text-red-500">*required</span>
              )}
              {/* Error message */}
              {description.length > 999 && (
                <span className="mt-2 text-sm text-red-500">
                  Description can't be more than 1000 characters
                </span>
              )}
            </div>

            {/* Start Date */}
            <div className="mt-4 mb-4">
              <label
                htmlFor="startDate"
                className="pr-4 font-sans text-base font-semibold text-gray-800"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                required
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1 text-base text-gray-900 border-2 border-gray-300 rounded-md outline-none bg-gray-50 focus:border-sky-300"
              />
              {/* Conditional rendering to display the required message */}
              {startDate.trim().length === 0 && (
                <span className="mt-2 text-sm text-red-500">*required</span>
              )}
            </div>

            {/* Due Date */}
            <div className="mt-4 mb-4">
              <label
                htmlFor="endDate"
                className="pr-4 font-sans text-base font-semibold text-gray-800"
              >
                Due Date:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                required
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1 text-base text-gray-900 border-2 border-gray-300 rounded-md outline-none bg-gray-50 focus:border-sky-300"
              />
              {endDate.trim().length === 0 && (
                <span className="mt-2 text-sm text-red-500">*required</span>
              )}
              {/* Additional conditional rendering to display error if due date is before start date */}
              {endDate && startDate && endDate < startDate && (
                <span className="mt-2 text-sm text-red-500">
                  Due date cannot be before start date
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                disabled={isFormInvalid} // Disable the button if form is invalid
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  isFormInvalid && "opacity-50 cursor-not-allowed"
                }`}
                onClick={saveNewTask}
              >
                Add
              </button>
              {/*<button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                Clear
              </button>*/}
              {CancelOrClearButton()}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;

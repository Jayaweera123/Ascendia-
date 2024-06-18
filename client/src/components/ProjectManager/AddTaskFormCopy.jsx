import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createTask, updateTask } from "../../services/TaskService";
import { useNavigate, useParams } from "react-router-dom";

function AddTaskForm(projectId) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  //const navigator = useNavigate();

  const { id } = useParams();

  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    taskName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

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

    if (validateForm()) {
      const task = {
        taskName,
        description,
        startDate,
        endDate,
        status,
      };
      console.log(task);

      if (id) {
        editTask(id, task)
          .then((response) => {
            console.log(response.data);
            navigator("/project/:projectId/task");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createTask(task)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Task created successfully!",
            }).then(() => {
              navigator("/project/:projectId/task");
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      clearForm();
    }
  }
  function clearForm() {
    setTaskName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  }

  function handleCancel(e) {
    navigator("/project/:projectId/task");
  }

  //Form validation
  /*function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }; //spread operator- copy errors object into errorsCopy

    if (taskName.trim()) {
      errorsCopy.taskName = "";
    } else {
      errorsCopy.taskName = "*Task name is required";
      valid = false;
    }

    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "*Task description name is required";
      valid = false;
    }

    if (startDate.trim()) {
      errorsCopy.startDate = "";
    } else {
      errorsCopy.startDate = "*Strat date is required";
      valid = false;
    }

    if (endDate.trim()) {
      errorsCopy.endDate = "";
    } else {
      errorsCopy.endDate = "*End date is required";
      valid = false;
    }

    if (description.length >= 0 && description.length < 100) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description =
        "*Description cannot be more than 100 characters";
      valid = false;
    }

    if (!isNaN(quantity) && Number.isInteger(Number(quantity))) {
      if (quantity >= 0) {
        errorsCopy.quantity = "";
      } else {
        errorsCopy.quantity = "*Quantity cannot be minus";
        valid = false;
      }
    } else {
      errorsCopy.quantity = "*Quantity must be a whole number";
      valid = false;
    }

    if (measuringUnit.trim()) {
      errorsCopy.measuringUnit = "";
    } else {
      errorsCopy.measuringUnit = "*Measuring Unit is required";
      valid = false;
    }

    if (!isNaN(minimumLevel) && Number.isInteger(Number(minimumLevel))) {
      if (minimumLevel > 0) {
        errorsCopy.minimumLevel = "";
      } else {
        errorsCopy.minimumLevel = "*Minimum Level is required";
        valid = false;
      }
    } else {
      errorsCopy.minimumLevel = "*Minimum Level must be a whole number";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }*/

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
                    Task name:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Material Code"
                      name="taskName"
                      id="taskName"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        errors.taskName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.materialCode && (
                      <div className="mt-1 text-sm text-red-500">
                        {errors.materialCode}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="materialName"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Material Name:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Material Name"
                      name="materialName"
                      id="materialName"
                      value={materialName}
                      onChange={(e) => setMaterialName(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        errors.materialName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.materialName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.materialName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Quantity:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Quantity of material"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        errors.quantity ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="measuringUnit"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Measuring Unit:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Measuring Unit"
                      name="measuringUnit"
                      id="measuringUnit"
                      value={measuringUnit}
                      onChange={(e) => setMeasuringUnit(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        errors.measuringUnit
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.measuringUnit && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.measuringUnit}
                      </p>
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
                      placeholder="Enter Discription"
                      id="description"
                      value={description}
                      maxLength={100} // Limit the number of characters
                      onChange={(e) => setDescription(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-24 ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="minimumLevel"
                    className="block text-base font-medium leading-6 text-gray-900"
                  >
                    Minimum Level:
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Enter Minimum Level"
                      name="minimumLevel"
                      id="minimumLevel"
                      value={minimumLevel}
                      onChange={(e) => setMinimumLevel(e.target.value)}
                      className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        errors.materialCode
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.minimumLevel && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.minimumLevel}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end mt-6 gap-x-6">
                <button
                  type="submit"
                  onClick={saveOrEditMaterial}
                  className="text-white bg-[#001b5e] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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

export default AddTaskForm;

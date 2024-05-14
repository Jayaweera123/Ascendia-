import React from "react";

function AddEmployeeForm() {
  return (
    <div>
      <div>
        <section className="flex gap-6">
          <div className="w-screen m-3">
            <div className="max-w-2xl pt-4 pb-4 pl-10 pr-10 mx-auto bg-white rounded-lg shadow-md">
              <form className="space-y-4">
                <div className="flex flex-row gap-3 pt-2 pb-1 mx-auto border-b items-centered border-gray-900/10">
                  Add Employee
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
                      {startDate.trim().length === 0 && (
                        <span className="mt-2 text-sm text-red-500"></span>
                      )}
                      {endDate && startDate && endDate < startDate && (
                        <span className="mt-2 text-sm text-red-500">
                          Start date must be before end date.
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
    </div>
  );
}

export default AddEmployeeForm;

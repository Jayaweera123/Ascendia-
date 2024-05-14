import { React, useEffect, useState } from "react";
import { getAllEmploeesForProject } from "../../services/ProjectService";

function EmployeeCard({ projectId }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch tasks for the project when projectId changes
    getAllEmploeesForProject(projectId)
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectId]);

  return (
    <div>
      <section className="max-w-6xl m-0 mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add Card 
          <div className="w-full bg-white rounded-lg p-8 flex flex-col justify-center items-center shadow-md">
            <div className="mb-4">
              <img className="object-center object-cover rounded-full h-24 w-24" />
            </div>
          </div> */}
          {/*Single Card*/}
          {projectId}
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="w-full bg-white rounded-lg p-8 flex flex-col justify-center items-center shadow-md"
            >
              <div className="mb-4">
                <img
                  className="object-center object-cover rounded-full h-24 w-24"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-700 font-bold mb-1">
                  {employee.assignedUser.firstName}{" "}
                  {employee.assignedUser.lastName}
                </p>
                <p className="text-sm text-gray-400 font-normal">
                  {employee.assignedUser.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EmployeeCard;

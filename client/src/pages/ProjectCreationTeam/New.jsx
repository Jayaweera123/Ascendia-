import React, { useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import { FaUsers } from "react-icons/fa";

const employees = [
  { name: "Tanner Finsha", email: "Tannerfisher@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Marketing", "Design"] },
  { name: "Emeto Winner", email: "Emetowinner@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Not Available", teams: ["Product", "Design"] },
  { name: "Tassy Omah", email: "Tassyomah@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Product"] },
  { name: "James Muriel", email: "JamesMuriel@aerten.finance", id: "#2345GH6JYT6", role: "Project Manager", status: "Not Available", teams: ["Engineering", "Design"] },
  { name: "Tanner Finsha", email: "Tannerfisher@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Marketing", "Design"] },
  { name: "Emeto Winner", email: "Emetowinner@gmail.com", id: "#2345GH6JYT6", role: "Project Managerr", status: "Not Available", teams: ["Product", "Design"] },
  { name: "Tassy Omah", email: "Tassyomah@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Product"] },
  { name: "James Muriel", email: "JamesMuriel@aerten.finance", id: "#2345GH6JYT6", role: "Project Manager", status: "Not Available", teams: ["Engineering", "Design"] },
  { name: "Tanner Finsha", email: "Tannerfisher@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Marketing", "Design"] },
  { name: "Emeto Winner", email: "Emetowinner@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Not Available", teams: ["Product", "Design"] },
  { name: "Tassy Omah", email: "Tassyomah@gmail.com", id: "#2345GH6JYT6", role: "Project Manager", status: "Available", teams: ["Product"] },
  { name: "James Muriel", email: "JamesMuriel@aerten.finance", id: "#2345GH6JYT6", role: "Project Manager", status: "Not Available", teams: ["Engineering", "Design"] },
  // Add more employees here
];



const New = () => {
  const [open, setOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);
  
    // Logic for displaying employees
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <TopNavigation />
      <section className="flex">
        <SideNavigationPCTeam open={open} setOpen={setOpen} />
        <div class="relative bg-zinc-50 bg-cover h-fit w-screen">
          <div className="m-3 text-base">
          <div className="flex flex-row gap-3 pt-2 pb-1 ml-5 items-centered">
              {/* Render the icon for user list */}
              <FaUsers size={80} color="#001b5e" />
              <div>
                {/* Render the title for user list */}
                <h1 className="place-items-baseline text-4xl leading-relaxed py-4 tracking-tight font-bold text-left text-[#001b5e]">
                  User List
                </h1>
              </div>
            </div>
        
       
        <div className="relative p-4 m-5 overflow-x-auto bg-white rounded-lg shadow-md">
        <input type="text" placeholder="Search Employee by name, role, ID or any related keywords" className="w-full p-2 mb-4 border rounded" />
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">ID</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">{employee.role}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded ${employee.status === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`px-4 py-2 rounded ${
                      employee.status === "Available" ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-600 cursor-not-allowed"
                    }`}
                    disabled={employee.status !== "Available"}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, index) => (
                <li
                  key={index}
                  className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border rounded cursor-pointer`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      </div>
      </div> 
      </section>
    </div>
  );
};

export default New;

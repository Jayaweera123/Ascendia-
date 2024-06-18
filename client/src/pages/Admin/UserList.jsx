import React, { useEffect, useState } from "react";
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import { LiaUserTimesSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import UserService from "../../services/UserService";


// Define the UserList component
const UserList = () => {
  // State variables to manage component state
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // useEffect hook to fetch user list when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('No token found');
      }
      const response = await UserService.getAllUsers(token);
      console.log("API Response:", response); // Log the entire response object

      // Check if the response is in the expected format
      if (response && Array.isArray(response.usersList)) {
        const activeUsers = response.usersList.filter(user => user.active);
        setUsers(activeUsers);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const addNewUser = () => {
    navigate("/admin/adduser");
  };

  const editUser = (userID) => {
    navigate(`/admin/update/${userID}`);
  };

  const removeUser = async (userID) => {
    try {
      const confirmDeactivation = window.confirm('Are you sure you want to deactivate this user?');
      if (confirmDeactivation) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await UserService.deactivateUser(userID, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  

  // Render the component JSX
  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div className="relative bg-zinc-100 bg-cover h-fit w-screen">
          <div className="m-3 text-xl font-semibold text-gray-900">
            <div className="flex flex-row gap-3 pt-2 pb-1 ml-5 items-centered">
             
              <FaUsers size={80} color="#001b5e" />
              <div>
                
                <h1 className="place-items-baseline text-4xl leading-relaxed py-4 tracking-tight font-bold text-left text-[#001b5e]">
                  User List
                </h1>
              </div>
            </div>
            <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
                {/* Button to add a new user */}
                <div>
                  <button
                    className="inline-flex flex-row gap-1 ml-10 items-center pb-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-[#101d3f] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    onClick={addNewUser}
                  >
                    <div>Add User</div>
                    <div>
                      <TiUserAddOutline size={20} />
                    </div>
                  </button>
                </div>
                {/* Input field for searching users */}
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    {/* Icon for search */}
                    <svg
                      className="w-4 h-4 text-gray-100 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  {/* Input field for searching users */}
                  <input
                    type="text"
                    id="table-search-users"
                    className="block pt-2 pb-2 mr-5 text-sm text-gray-600 border-gray-100 rounded-lg ps-10 w-80 focus:ring-blue-100 focus:border-blue-100 bg-slate-50 dark:border-gray-100 dark:placeholder-gray-300 dark:text-gray-500 dark:focus:ring-blue-100 dark:focus:border-blue-100"
                    placeholder="Search for users"
                  />
                </div>
              </div>
            </div>
            <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg shadow-md">
                <thead className="text-sm text-white uppercase bg-gray-500 h-20">
                  {/* Table headers */}
                  <tr>
                    <th scope="col" className="w-60 px-5 py-3">
                      Name
                    </th>
                    <th scope="col" className="w-60 px-4 py-3">
                      Designation
                    </th>
                    <th scope="col" className="w-32 px-4 py-3">
                      Department
                    </th>
                    <th scope="col" className="w-36 px-4 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="w-40 px-5 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render user data in table rows */}
                  {users.map((user) => (
                    <tr
                      key={user.userID}
                      className="bg-white border-b dark:border-gray-100 hover:bg-gray-50"
                    >
                      {/* Display user information */}
                      
                      <th
                        scope="row"
                        className="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        <img
                          src={user.profilePicUrl ? `http://localhost:8080/${user.profilePicUrl.replace(/\\/g, "/")}` : ""} // Assuming the server is running on localhost:8080
                          className="w-12 h-12 rounded-full"
                          alt={`Profile of ${user.firstName} ${user.lastName}`}
                        />

                        <div className="ps-3">
                          <div className="flex flex-row text-base font-semibold">
                            <div>{user.firstName}</div>
                            <div className="ml-1">{user.lastName}</div>
                          </div>
                          <div className="font-normal text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-3 w-60">{user.designation}</td>
                      <td className="px-4 py-3 w-32">{user.department}</td>
                      <td className="px-4 py-3">{user.phoneNumber}</td>
                      
                      {/* Buttons for editing and deleting users */}
                      <td className="px-2 py-3">
                        <button
                          className="inline-flex flex-row gap-1 pb-2 pl-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-[#101d3f] dark:text-white dark:border-gray-100 dark:hover:bg-gray-400 dark:hover:border-gray-100 dark:focus:ring-gray-100"
                          type="button"
                          onClick={() => editUser(user.userID)}
                        >
                          <div>
                            <LiaUserEditSolid size={20} />
                          </div>
                          <div>Edit</div>
                        </button>
                        <button
                          className="inline-flex flex-row gap-1 pb-2 pl-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-red-600 dark:text-white dark:border-gray-100 dark:hover:bg-gray-400 dark:hover:border-gray-100 dark:focus:ring-gray-100"
                          type="button"
                          onClick={() => removeUser(user.userID)}
                        >
                          <div>
                            <LiaUserTimesSolid size={20} />
                          </div>
                          <div>Delete</div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Export the UserList component
export default UserList;

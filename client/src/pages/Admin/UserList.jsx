// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { FaUsers } from "react-icons/fa";
import { userList, deactivateUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { TiUserAddOutline } from "react-icons/ti";
import { LiaUserTimesSolid } from "react-icons/lia";

// Define the UserList component
const UserList = () => {
  // State variables to manage component state
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const navigator = useNavigate();

  // useEffect hook to fetch user list when component mounts
  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to fetch all users from the server
  function getAllUsers() {
    userList()
      .then((response) => {
        // Filter out inactive users
        const activeUsers = response.data.filter(user => user.active);
        setUsers(activeUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Function to navigate to the Add User page
  function addNewUser() {
    navigator("/adduser");
  }

  // Function to navigate to the Edit User page for a specific user
  function editUser(userID) {
    navigator(`/edituser/${userID}`);
  }

  // Function to remove a user from the list
  function removeUser(userID) {
    // Deactivate the user instead of deleting
    deactivateUser(userID)
      .then(() => {
        // Fetch updated user list after deactivation
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Render the component JSX
  return (
    <div>
      {/* Render the top navigation component */}
      <TopNavigationAdmin />
      <section className="flex">
        {/* Render the side navigation component */}
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div class="relative bg-zinc-100 bg-cover h-fit w-screen">
          <div className="m-3 text-xl font-semibold text-gray-900">
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
            <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
              <div class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4">
                {/* Button to add a new user */}
                <div>
                  <button
                    class="inline-flex flex-row gap-1 ml-10 items-center pb-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-[#101d3f] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    {/* Icon for search */}
                    <svg
                      class="w-4 h-4 text-gray-100 dark:text-gray-400"
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
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg shadow-md">
                <thead className="text-sm text-white uppercase bg-gray-500 ">
                  {/* Table headers */}
                  <tr>
                    <th scope="col" className="w-5 px-5 py-3">
                      User Id
                    </th>
                    <th scope="col" className="w-24 px-5 py-3">
                      Name
                    </th>
                    <th scope="col" className="w-64 px-4 py-3">
                      Designation
                    </th>
                    <th scope="col" className="w-10 px-3 py-3">
                      Department
                    </th>
                    <th scope="col" className="w-10 px-4 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-4 py-3 w-30">
                      Username
                    </th>
                
                    <th scope="col" className="px-5 py-3 w-15">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render user data in table rows */}
                  {users.map((user) => (
                    <tr
                      key={user.userID}
                      class="bg-white border-b dark:border-gray-100 hover:bg-gray-50"
                    >
                      {/* Display user information */}
                      <td class="px-6 py-3 w-20">{user.userID}</td>
                      <th
                        scope="row"
                        class="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-black"
                      >
                        <img
                          src={user.profileImage} 
                          className="w-10 h-10 rounded-full"
                          alt={`Profile of ${user.firstName} ${user.lastName}`}
                        />
                        <div class="ps-3">
                          <div className="flex flex-row text-base font-semibold">
                            <div>{user.firstName}</div>
                            <div className="ml-1">{user.lastName}</div>
                          </div>
                          <div class="font-normal text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </th>
                      <td class="px-4 py-3 w-40">{user.designation}</td>
                      <td class="px-4 py-3">{user.department}</td>
                      <td class="px-4 py-3">{user.phoneNumber}</td>
                      <td class="px-4 py-3">{user.username}</td>
                      
                      {/* Buttons for editing and deleting users */}
                      <td class="px-2 py-3">
                        <button
                          class="inline-flex flex-row gap-1 pb-2 pl-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-[#101d3f] dark:text-white dark:border-gray-100 dark:hover:bg-gray-400 dark:hover:border-gray-100 dark:focus:ring-gray-100"
                          type="button"
                          onClick={() => editUser(user.userID)}
                        >
                          <div>
                            <LiaUserEditSolid size={20} />
                          </div>
                          <div>Edit</div>
                        </button>
                        <button
                          class="inline-flex flex-row gap-1 pb-2 pl-2 text-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 bg-red-600 dark:text-white dark:border-gray-100 dark:hover:bg-gray-400 dark:hover:border-gray-100 dark:focus:ring-gray-100"
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

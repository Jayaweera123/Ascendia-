import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";

const OnlineUserList = () => {
  const [users, setUsers] = useState([]);
  const [matchedUserIDs, setMatchedUserIDs] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  useEffect(() => {
    fetchOnlineUsers();
  }, []);

  const fetchOnlineUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('No token found');
      }
      const response = await UserService.getOnlineUsers(token);
      console.log("API Response:", response); // Log the entire response object

      // Check if the response is in the expected format
      if (response && Array.isArray(response)) {
        setUsers(response);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //Pagination
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
            <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg shadow-md">
                <thead className="text-sm text-white uppercase bg-gray-500 h-20">
                  {/* Table headers */}
                  <tr>
                    <th scope="col" className="w-60 px-5 py-3">
                      Online User
                    </th>
                    <th scope="col" className="w-60 px-4 py-3">
                      Designation
                    </th>                 
                  </tr>
                </thead>
                <tbody>
                  {/* Render user data in table rows */}
                  {records.map((user) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <button
                  className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none"
                  onClick={prePage}
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {numbers.map((n, i) => (
                    <button
                      className={`${
                        currentPage === n
                          ? "px-3 py-1 text-sm border rounded-full border-blue-gray-500 focus:outline-none bg-slate-200"
                          : "px-3 py-1 text-sm focus:outline-none border rounded-full border-blue-gray-500"
                      }`}
                      key={i}
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  className="px-3 py-1 text-sm text-blue-500 border border-blue-500 rounded-sm focus:outline-none"
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
            </div>
         
  );
};

export default OnlineUserList;

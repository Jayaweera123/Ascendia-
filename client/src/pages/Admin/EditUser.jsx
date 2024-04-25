// AddUser.jsx
import React, { useState } from "react";
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { FaUserEdit } from "react-icons/fa";

const EditUser = () => {
  const [open, setOpen] = useState(true);
  

  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex gap-6">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div className="pb-20 m-3 text-xl font-semibold text-gray-900">
 
    <form action="https://getform.io/f/7675bf41-8d9b-43d9-99d7-c52b46d7cd96" method="POST" encType="multipart/form-data">
      <div className="space-y-5">
        <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
        <FaUserEdit size={90} color="#001b5e"/>
          <div><h1 className="place-items-baseline py-4 text-4xl font-bold leading-relaxed text-left text-[#001b5e]">Edit User</h1></div>
        </div>
        
        <div className="pb-12 border-b border-gray-900/10">
          
          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <label htmlFor="first-name" className="block text-base font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="last-name" className="block text-base font-medium leading-6 text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="PhoneNo" className="block text-base font-medium leading-6 text-gray-900">
                Phone No.
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phoneno."
                  id="phoneno."
                  autoComplete="given-no"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-7">
              <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="uid" className="block text-base font-medium leading-6 text-gray-900">
                User Id
              </label>
              <div className="mt-2">
                <input
                  id="uid"
                  name="uid"
                  type="uid"
                  autoComplete="uid"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="created-date" className="block text-base font-medium leading-6 text-gray-900">
                Created Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="created-date"
                  id="created-date"
                  autoComplete="created-date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                />
              </div>
            </div>

            <div className="col-span-7">
              <label htmlFor="photo" className="block text-base font-medium leading-6 text-gray-900">
                Profile Photo
              </label>
              <div className="flex items-center mt-2 gap-x-3">
                <UserCircleIcon className="text-gray-300 w-23 h-23" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
            <br></br>

        
            <div className="sm:col-span-5">
              <label htmlFor="designation" className="block text-base font-medium leading-6 text-gray-900">
                Designation
              </label>
              <div className="mt-2">
                <select
                  id="designation"
                  name="designation"
                  autoComplete="designation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Project Manager</option>
                  <option>Project Creation Team Member</option>
                  <option>Site Engineer</option>
                  <option>Technical Officer</option>
                  <option>Supervisor</option>
                  <option>Store Keeper</option>
                  <option>Quantity Surveyor</option>
                  <option>Client</option>
                  <option>Consultant</option>
                  <option>Administrator</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-5">
              <label htmlFor="department" className="block text-base font-medium leading-6 text-gray-900">
                Department
              </label>
              <div className="mt-2">
                <select
                  id="department"
                  name="department"
                  autoComplete="department"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>PMD 1</option>
                  <option>PMD 2</option>
                  <option>PMD 3</option>
                  <option>PMD 4</option>
                  <option>PMD 5</option>
                </select>
              </div>
            </div>

          </div>
        </div>

    

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <button type="button" className="text-xl font-semibold leading-6 text-gray-900">
          Delete
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-xl font-semibold text-white bg-[#001b5e] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit
        </button>
      </div>
      </div>
    </form>
  
        </div>
      </section>
    </div>
  );
};

export default EditUser;

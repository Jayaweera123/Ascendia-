// Home.jsx
import React, { useEffect, useState } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/ProjectManager/SideNavigation";

import { RiUserAddFill } from "react-icons/ri";
//import { addUser, editUser, getUser } from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";

import { MdAssignmentAdd } from "react-icons/md";
import axios from "axios";








const AddProject = () => {
  const [open, setOpen] = useState(true);

  {/*const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [addedDate, setAddedDate] = useState('');
  const { userID } = useParams(); // Get the user ID from the URL parameters
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addedDate: '',
  });
  const navigator = useNavigate();

  // useEffect hook to fetch user data if editing an existing user
  useEffect(() => {
    if (userID) {
      getUser(userID)
        .then((response) => {
          // Set state with user data fetched from the server
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setDesignation(response.data.designation);
          setDepartment(response.data.department);
          setProfilePhoto(response.data.profilePhoto);
          setAddedDate(response.data.addedDate);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userID]);

  

  // Function to handle form submission for adding or editing a user
  function saveOrEditUser(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs
    if (validateForm()) {
      
        

      const user = { firstName, lastName, email, phoneNumber, addedDate, department, designation, profilePhoto }
      console.log(user)

      if (userID) {
        // If editing an existing user, call editUser function from the service
        editUser(userID, user)
          .then((response) => {
            console.log(response.data);
            navigator('/userlist'); // Navigate to the user list page after successful edit
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // If adding a new user, call addUser function from the service
        addUser(user)
          .then((response) => {
            console.log(response.data);
            navigator('/userlist'); // Navigate to the user list page after successful addition
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  // Function to reset form fields
  function removeUser() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setDesignation('');
    setDepartment('');
    setProfilePhoto('');
    setAddedDate('');
    window.location.reload(); // Reload the page to reset the form
  }
*/}

  
  // Function to validate form inputs
  {/*function validateForm() {
    let valid = true;

    // Copy errors object to prevent mutation of state directly
    const errorsCopy = { ...errors };

    // Validate each form field
    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First name is required!';
      valid = false;
    }

    // Validate last name
    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last name is required!';
      valid = false;
    }

    // Validate email
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required!';
      valid = false;
    }

    // Validate phone number
    if (phoneNumber.trim()) {
      errorsCopy.phoneNumber = '';
    } else {
      errorsCopy.phoneNumber = 'Phone number is required!';
      valid = false;
    }

    // Validate added date
    if (addedDate.trim()) {
      errorsCopy.addedDate = '';
    } else {
      errorsCopy.addedDate = 'Added date is required!';
      valid = false;
    }

    // Update errors state
    setErrors(errorsCopy);

    return valid;
  } */}

  
return (
  <div>
    <TopNavigation />
    <section className="flex">
      <SideNavigation open={open} setOpen={setOpen} />
      <div class="relative bg-zinc-50 bg-cover h-fit w-screen">
        <div className="m-3 text-xl font-semibold text-gray-900">
        <form method="POST" encType="multipart/form-data">
        <div className="space-y-5">
        <div className="flex flex-row gap-3 pt-2 pb-2 border-b items-centerd border-gray-900/10">
        <MdAssignmentAdd size={90} color="#001b5e"/>
          <div><h1 className="place-items-baseline py-4 text-4xl font-bold leading-relaxed text-left text-[#001b5e]">Edit User</h1></div>
        </div>
                
                <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
                  <div className="pb-12 border-b border-gray-900/10">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
                      
                    <div className="sm:col-span-5">
              <label htmlFor="first-name" className="block text-base font-medium leading-6 text-gray-900">
                First name
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
                Last name
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
                 
                  className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

            <div className="sm:col-span-4">
              <label htmlFor="added-date" className="block text-base font-medium leading-6 text-gray-900">
                Added Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="added-date"
                  id="added-date"
                  autoComplete="added-date"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 tracking-wide"
                />
                
              </div>
            </div>

            
            <br></br>
            </div>                
      </div>
          


            {/* Buttons for adding or deleting user */}
      <div className="flex items-center justify-end mt-6 mb-5 mr-5 gap-x-6">
                        <button
                          type="submit"
                          
                          className="px-3 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          
                          className="px-3 py-2 text-xl font-semibold leading-6 text-gray-900 bg-gray-200 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Delete
                        </button>
      </div>

      
      </div>  
      </div> 
    </form>
          
  
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddProject;







// AddUser.jsx
import React, { useEffect, useState } from "react"; // Import necessary hooks from React
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { RiUserAddFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { addUser, editUser, getUser, deactivateUser } from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom"; // Assuming react-router-dom is used for routing




// Define the AddUser component
const AddUser = () => {

  // State variables to manage component state
  const [open, setOpen] = useState(true);

  const [formData, setFormData] = useState({
    userID: '', 
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    designation: '',
    department: '',
    addedDate: '', 
    profileImage: null
  });
 
  const { userID } = useParams(); // Get the user ID from the URL parameters
  // Initialize state for form errors
  const [errors, setErrors] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    addedDate: '',
  });

  // Use navigate hook for routing
  const navigator = useNavigate(); // Assuming this is used for navigation within the application

  // useEffect hook to fetch user data if editing an existing user
  useEffect(() => {
    if (userID) {
      getUser(userID)
        .then((response) => {
          setFormData(response.data); // Update form data with user data fetched from the server
        })
        .catch((error) => {
          console.error("Error fetching user data:", error); // Log the error to the console for debugging
        });
    }
  }, [userID]);
  
  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle file input change for profile image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0]
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userID) {
        await editUser(userID, formData);
      } else {
        await addUser(formData);
      }
      navigator('/userlist');
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle form submission for adding or editing a user
  async function saveOrEditUser(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs
    if (validateForm()) {
      // Generate a random 5-digit user ID
      //const userID = generateRandomUserID();
      
      // Set addedDate to the current date
      //const today = new Date();
      //const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      const user = { 
        userID: formData.userID,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        designation: formData.designation,
        department: formData.department,
        addedDate: formData.addedDate // Include addedDate in form data
        
      };
      
      // Append profileImage to the user object if it exists
      if (formData.profileImage) {
        user.profileImage = formData.profileImage;
      }

      try {
        // Call addUser function from the service with the user object
        const response = await addUser(user);
        console.log(response.data);
        // Clear form data after successful addition
        setFormData({
          userID: '', 
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          designation: '',
          department: '',
          addedDate: '', 
          profileImage: null
        });
        // Navigate to the user list page after successful addition
        navigator('/userlist');
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Function to generate a random 5-digit user ID
  {/*function generateRandomUserID() {
    return Math.floor(10000 + Math.random() * 90000); // Generate a random number between 10000 and 99999
  }*/}

  {/*if (userID) {
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
  }*/}

  // Function to deactivate user account and clear form fields
  const removeUser = async () => {
    try {
      await deactivateUser(userID);
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        designation: '',
        department: '',
        addedDate: '',
        profileImage: null
      });
      navigator('/userlist');
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };


  // Function to validate form inputs
  function validateForm() {
    let valid = true;

    // Copy errors object to prevent mutation of state directly
    const errorsCopy = { ...errors };

    // Validate each form field
    // Validate userID
    if (!formData.userID.trim()) {
      errorsCopy.userID = 'User ID is required!';
      valid = false;
    } else {
      errorsCopy.userID = '';
    }
    // Validate firstName
    if (!formData.firstName.trim()) {
      errorsCopy.firstName = 'First Name is required!';
      valid = false;
    } else {
      errorsCopy.firstName = '';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      errorsCopy.lastName = 'Last Name is required!';
      valid = false;
    } else {
      errorsCopy.lastName = '';
    }

    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      errorsCopy.phoneNumber = 'Phone Number is required!';
      valid = false;
    } else {
      errorsCopy.phoneNumber = '';
    }

    // Validate email
    if (!formData.email.trim()) {
      errorsCopy.email = 'Email is required!';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    // Validate addedDate
    if (!formData.addedDate.trim()) {
      errorsCopy.addedDate = 'First Name is required!';
      valid = false;
    } else {
      errorsCopy.addedDate = '';
    }

    // Update errors state
    setErrors(errorsCopy);

    return valid;
  }

  // Function to render page title based on whether adding or editing a user
  {/*function pageTitle() {
    if (userID) {
      // If editing an existing user
      return (
        <div className="flex flex-row gap-3 pt-2 items-centered">
          <FaUserEdit size={90} color="#001b5e" />
          <div>
            <h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">
              Edit User
            </h1>
          </div>
        </div>
      );
    } else {
      // If adding a new user
      return (
        <div className="flex flex-row gap-3 pt-2 items-centered">
          <RiUserAddFill size={90} color="#001b5e" />
          <div>
            <h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">
              Add User
            </h1>
          </div>
        </div>
      );
    }
  }*/}

  // Function to render page title dynamically based on whether adding or editing a user
  function pageTitle() {
    const isEditing = !!userID; // Check if editing an existing user
    const icon = isEditing ? <FaUserEdit size={90} color="#001b5e" /> : <RiUserAddFill size={90} color="#001b5e" />;
    const title = isEditing ? "Edit User" : "Add User";

    return (
      <div className="flex flex-row gap-3 pt-2 items-centered">
        {icon}
        <div>
          <h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">
            {title}
          </h1>
        </div>
      </div>
    );
  }


  // Return the JSX content of the component
  return (
    <div>
      <TopNavigationAdmin />
      <section className="flex">
        <SideNavigationAdmin open={open} setOpen={setOpen} />
        <div class="relative bg-zinc-50 bg-cover h-fit w-screen">
          <div className="m-3 text-xl font-semibold text-gray-900">

            <form method="POST" onSubmit={handleSubmit}  encType="multipart/form-data">
              <div className="space-y-5">
                {/* Render page title */}
                {
                pageTitle()
                }
                <div className="relative m-5 overflow-x-auto bg-white rounded-lg shadow-md">
                  <div className="pb-12 border-b border-gray-900/10">
                    <div className="grid grid-cols-1 m-5 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">

                      {/* Input fields for user details */}
                      {/* Input for User ID */}
                      <div className="sm:col-span-3">
                        <label htmlFor="userID" className="block text-base font-medium leading-6 text-gray-900">
                          User ID
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="userID" //Match the property name in formData
                            id="userID"
                            autoComplete="userId"
                            value={formData.userID} 
                            onChange={handleChange}
                            className={`form-input ${errors.userID ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.userID && <div className='text-red-500'> {errors.userID}</div>}
                        </div>
                      </div>
                      
                      {/* Input for First Name */}
                      <div className="sm:col-span-5 sm:row-start-2">
                        <label htmlFor="first-name" className="block text-base font-medium leading-6 text-gray-900">
                          First Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            autoComplete="given-name"
                            value={formData.firstName} 
                            onChange={handleChange} 
                            className={`form-input ${errors.firstName ? 'border-red-500' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.firstName && <div className="text-red-500"> {errors.firstName}</div>}
                        </div>
                      </div>

                      {/* Input for Last Name */}
                      <div className="sm:col-span-5 sm:row-start-2">
                        <label htmlFor="last-name" className="block text-base font-medium leading-6 text-gray-900">
                          Last Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            autoComplete="family-name"
                            value={formData.lastName} 
                            onChange={handleChange}
                            className={`form-input ${errors.lastName ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.lastName && <div className='text-red-500'> {errors.lastName}</div>}
                        </div>
                      </div>

                      {/* Input for Phone Number */}
                      <div className="sm:col-span-3 sm:row-start-3">
                        <label htmlFor="PhoneNo" className="block text-base font-medium leading-6 text-gray-900">
                          Phone No.
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            id="phoneno."
                            autoComplete="given-no"
                            value={formData.phoneNumber} 
                            onChange={handleChange}
                            className={`form-input ${errors.phoneNumber ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.phoneNumber && <div className='text-red-500'> {errors.phoneNumber}</div>}
                        </div>
                      </div>

                      {/* Add a gap */}
                      <div className="sm:col-span-2 sm:row-start-3"></div>

                      {/* Input for Email Address */}
                      <div className="sm:col-span-6 sm:row-start-3">
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                          Email Address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email} 
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.email && <div className='text-red-500'> {errors.email}</div>}
                        </div>
                      </div>

                      {/* Input for Designation */}
                      <div className="sm:col-span-5 sm:row-start-4">
                        <label htmlFor="designation" className="block text-base font-medium leading-6 text-gray-900">
                          Designation
                        </label>
                        <div className="mt-2">
                          <select
                            id="designation"
                            name="designation"
                            autoComplete="designation"
                            value={formData.designation} 
                            onChange={handleChange}
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

                      {/* Input for Department */}
                      <div className="sm:col-span-3 sm:row-start-4">
                        <label htmlFor="department" className="block text-base font-medium leading-6 text-gray-900">
                          Department
                        </label>
                        <div className="mt-2">
                          <select
                            id="department"
                            name="department"
                            autoComplete="department"
                            value={formData.department} 
                            onChange={handleChange}
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

                      {/* Input for Profile Image */}
                      <div className="sm:col-span-5 sm:row-start-5">
                        <label htmlFor="profileImage" className="block text-base font-medium leading-6 text-gray-900">
                          Profile Image
                        </label>
                        <div className="mt-2">
                          <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            onChange={handleFileChange}
                            className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      {/* Input for Added Date */}
                      <div className="sm:col-span-3 sm:row-start-5">
                        <label htmlFor="AddedDate" className="block text-base font-medium leading-6 text-gray-900">
                          Added Date
                        </label>
                        <div className="mt-2">
                          <input
                            type="date"
                            name="addedDate"
                            id="addedDate"
                            autoComplete="given-date"
                            value={formData.addedDate} 
                            onChange={handleChange}
                            className={`form-input ${errors.addedDate ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.addedDate && <div className='text-red-500'> {errors.addedDate}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons for adding or deleting user */}
                  <div className="flex items-center justify-end mt-6 mb-5 mr-5 gap-x-6">
                    <button
                      type="submit"
                      onClick={saveOrEditUser}
                      className="px-3 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {userID ? 'Update' : 'Add'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={removeUser}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
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

// Export the AddUser component
export default AddUser;

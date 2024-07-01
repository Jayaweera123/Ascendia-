import React, { useEffect, useState } from "react"; 
import SideNavigationAdmin from "../../components/Admin/SideNavigationAdmin";
import TopNavigationAdmin from "../../components/Admin/TopNavigationAdmin";
import { RiUserAddFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import UserService from "../../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const [open, setOpen] = useState(true);
  const { userID } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    designation: '',
    department: '',
    profileImage: null
  });
 
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    designation: '',
    profileImage: ''
  });

  const navigate = useNavigate(); // Assuming this is used for navigation within the application

  // useEffect hook to fetch user data if editing an existing user
  useEffect(() => {
    if (userID) {
      fetchFormDataById(userID); // Pass the userId to fetchUserDataById     
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        designation: '',
        department: '',
        profileImage: null
      });
    }
  }, [userID]);

  const fetchFormDataById = async (userID) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userID, token);
      const { firstName, lastName, phoneNumber, email, designation, department, profilePicUrl } = response.user;
      setFormData({ 
        firstName, 
        lastName, 
        phoneNumber, 
        email, 
        designation, 
        department, 
        profileImage: profilePicUrl ? `${UserService.BASE_URL}/${profilePicUrl}` : null 
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle file input change for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors({
        ...errors,
        profileImage: 'Profile image size should not exceed 2MB'
      });
    } else {
      setFormData({
        ...formData,
        profileImage: file
      });
      setErrors({
        ...errors,
        profileImage: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'profileImage' && formData[key] && formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (key !== 'profileImage') {
        formDataToSend.append(key, formData[key]);
      }
    });


    console.log("Form Data to Send:");
    for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Error',
            text: 'No token found, please login again.',
          }).then(() => {
            navigate('/login');  // Redirect to login if no token is found
          });
          return;
        }
        
        // Check if we're adding or updating a user
        let response;
        if (userID) {
            response = await UserService.updateUser(userID, formDataToSend, formData.profileImage, token);
        } else {
            response = await UserService.addUser(formDataToSend, formData.profileImage, token);
        }

        console.log('User added/updated successfully:', response);

        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            designation: '',
            department: '',
            profileImage: null
        });
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `User ${userID ? 'updated' : 'added'} successfully`,
        }).then(() => {
          navigate('/admin/userlist');
        });
      } catch (error) {
        UserService.handleError(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding/updating the user. Please try again.',
        });
      }
    };
  

  // Function to clear form fields
  const removeUser = async () => {
    try { 
      navigate('/admin/userlist');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  

  // Function to validate form inputs
  function validateForm() {
    let valid = true;

    // Copy errors object to prevent mutation of state directly
    const errorsCopy = { ...errors };
    
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

    if (!formData.designation.trim()) {
      errorsCopy.designation = 'Designation is required!';
      valid = false;
    } else {
      errorsCopy.designation = '';
    }

    if (formData.profileImage && formData.profileImage.size > 2 * 1024 * 1024) {
      errorsCopy.profileImage = 'Profile image size should not exceed 2MB';
      valid = false;
    } else {
      errorsCopy.profileImage = '';
    }

    // Update errors state
    setErrors(errorsCopy);

    return valid;
  }

  // Function to render page title dynamically based on whether adding or editing a user
  function pageTitle() {
    const isEditing = !!userID; // Check if editing an existing user
    
    const title = isEditing ? "Edit User" : "Add User";

    return (
      <div className="flex flex-row gap-3 pt-2 items-centered ml-5">
        
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
        <div class="relative bg-zinc-100 bg-contain h-fit w-screen">
          <div className="m-5 mt-2 mb-1 text-xl font-semibold text-gray-900">
            <form method="POST" onSubmit={handleSubmit}  encType="multipart/form-data">
              <div className="space-y-5">
                {/* Render page title */}
                {
                pageTitle()
                }
                <div className="relative ml-5 mr-5 overflow-x-auto bg-white rounded-lg shadow-md">
                  <div className="pb-5 border-b border-gray-900/10">
                    <div className="grid grid-cols-1 ml-5 gap-x-6 gap-y-8 sm:grid-cols-12">

                      {/* Input fields for user details */}
                      
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
                            autoComplete="off"
                            value={formData.designation} 
                            onChange={handleChange}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 ${errors.designation ? 'border-red-500' : ''}`}
                          >
                            <option value="" disabled selected>Select Designation</option>
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
                          {errors.designation && <span className="text-red-500">{errors.designation}</span>}
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
                            autoComplete="off"
                            value={formData.department} 
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="" disabled selected>Select Department</option>
                            <option>PMD 1</option>
                            <option>PMD 2</option>
                            <option>PMD 3</option>
                            <option>PMD 4</option>
                            <option>PMD 5</option>
                          </select>
                        </div>
                      </div>             

                      {/* Input for Profile Image */}
                      <div className="sm:col-span-12 sm:row-start-5">
                        <label className="block text-base font-medium leading-6 text-gray-900">Profile Photo</label>
                        <div className="mt-2 flex items-center">
                          {formData.profileImage ? (
                            <img src={typeof formData.profileImage === 'string' ? formData.profileImage : URL.createObjectURL(formData.profileImage)} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
                          ) : (
                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 0H0v24h24V0z" fill="none" />
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </span>
                          )}
                          <input
                            type="file"
                            name="profileImage"
                            onChange={handleFileChange}
                            className={`ml-5 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${errors.profileImage ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.profileImage && <div className="text-red-500 mt-2">{errors.profileImage}</div>}
                      </div>

                    </div>
                  </div>
                

                  {/* Buttons for adding or deleting user */}
                  <div className="flex items-center justify-end mt-5 mb-5 mr-5 gap-x-6">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-24 px-4 py-2 text-xl font-semibold text-white bg-[#101d3f] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {userID ? 'Update' : 'Add'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={removeUser}
                      className="w-24 px-4 py-2 text-xl font-semibold text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

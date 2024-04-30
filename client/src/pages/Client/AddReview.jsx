// Import necessary dependencies and components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavigationClient from "../../components/Client/SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { format } from 'date-fns'; // Import date-fns for formatting dates
import { addReview } from "../../services/ReviewService"; // Import your review service

// Define AddReview component
const AddReview = () => {
  // State variables
  const [open, setOpen] = useState(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewContent, setReviewContent] = useState('')

  const [errors, setErrors] = useState({
    email: '',
    reviewTitle: '',
    reviewContent: '',
  });


  // React router navigate function
  const navigator = useNavigate();
  
  // Toggle popover state
  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  // Clear form data function
  const handleCancelClick = () => {
    console.log('Form data cleared!');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (validateForm()) {
      
      // Create review object
    const review = { email, reviewTitle, reviewContent };
    console.log(review);

    // Call addReview service method
    addReview(review)
        .then((response) => {
            console.log(response.data);
            //navigator('/reviews'); // Redirect to reviews page after successful submission
        })
        .catch((error) => {
            console.error('Error adding review:', error);
        });
    };

    
  }

    // Function to validate form inputs
    function validateForm() {
      let valid = true;
  
      // Copy errors object to prevent mutation of state directly
      const errorsCopy = { ...errors };
  
      // Validate each form field
      
      if (email.trim()) {
        errorsCopy.email = 'Email is required!';
        valid = false;
      } else {
        errorsCopy.email = '';
      }
      
      if (reviewTitle.trim()) {
        errorsCopy.reviewTitle = 'Title is required!';
        valid = false;
      } else {
        errorsCopy.reviewTitle = '';
      }
  
      
      if (reviewContent.trim()) {
        errorsCopy.reviewContent = 'Content is required!';
        valid = false;
      } else {
        errorsCopy.reviewContent = '';
      }
      
      // Update errors state
      setErrors(errorsCopy);
  
      return valid;
    }

  return (
    <div>
      {/* Render top navigation */}
      <TopNavigationClient />
      <section className="flex gap-6">
        {/* Render side navigation */}
        <SideNavigationClient open={open} setOpen={setOpen} />
        <div className="m-3 text-xl font-semibold text-gray-900">
          <div className="bg-white">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-row gap-3 pt-2 pb-1 border-b items-centered border-gray-900/10">
                  <MdOutlineRateReview size={100} color="#001b5e"/>
                  <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">Add Review</h1></div>
                </div>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Your valuable review is instrumental in ensuring that our project aligns seamlessly with your expectations and aspirations.
                </p>
              </div>
              {/* Popover */}
              <div className="relative pt-3">
                <button
                  className="flex flex-row p-2 gap-1 text-white bg-[#001b5e] rounded-md hover:bg-blue-900"
                  onClick={handlePopoverToggle}
                >
                  <div className="flex flex-row leading-relaxed text-white items-centered">
                    <div><MdOutlineAddBox size={30} /></div>
                  </div>
                  <div className="place-items-baseline">Add New Review</div> 
                </button>
                {/* Render form if popover is open */}
                {isPopoverOpen && (
                  <form method="POST" encType="multipart/form-data">
                    <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
                      <div className="sm:col-span-8">
                        <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                          Email Address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className={`form-input ${errors.email ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.email && <div className='text-red-500'> {errors.email}</div>}
                        </div>
                      </div>
                      <div className="sm:col-span-9">
                        <label htmlFor="RTitle" className="block text-base font-medium leading-6 text-gray-900">
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="reviewTitle"
                            id="RTitle"
                            autoComplete="RTitle"
                            onChange={(e) => setReviewTitle(e.target.value)}
                            className={`form-input ${errors.reviewTitle? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.reviewTitle && <div className='text-red-500'> {errors.reviewTitle}</div>}
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="content" className="block text-base font-medium leading-6 text-gray-900">
                          Content
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="content"
                            name="ReviewContent"
                            rows={7}
                            onChange={(e) => setReviewContent(e.target.value)}                           
                            defaultValue={''}
                            className={`form-input ${errors.reviewContent ? 'border-red-500' : '' } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                          />
                          {errors.reviewContent && <div className='text-red-500'> {errors.reviewContent}</div>}
                        </div>
                      </div>   
                    </div>
                    <div className="flex items-center justify-end mt-6 gap-x-6">         
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-3 py-2 text-xl font-semibold text-white bg-[#001b5e] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 text-xl font-semibold leading-6 text-gray-900 bg-gray-300 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddReview;

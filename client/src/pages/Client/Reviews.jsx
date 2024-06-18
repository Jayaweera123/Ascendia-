import React, { useState, useEffect } from "react";
import SideNavigationClient from "../../components/Client/SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import { format } from 'date-fns'; // Import date-fns for formatting dates

const AddReview = () => {
  const [open, setOpen] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (!token) {
        throw new Error('No token found');
      }
      const response = await ReviewService.getAllReviews(token);
      console.log("API Response:", response); // Log the entire response object
      setReviews(response); // Set the fetched reviews to state
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <div>
      <TopNavigationClient />
      <section className="flex gap-6">
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

        {/*Reviews*/}
        <div className="grid max-w-2xl grid-cols-1 pt-10 pb-20 mx-auto mt-2 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.reviewID} className="flex flex-col items-start justify-between max-w-xl">
              <div className="flex items-center text-xs gap-x-4">
              <time dateTime={review.reviewedDate} className="text-gray-500">
                        {format(new Date(review.reviewedDate), 'PPP')} {/* Format the date */}
              </time>
                {/*<a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a> */}
              </div>
              <div className="relative group">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">                  
                    <span className="absolute inset-0" />
                    {review.reviewTitle}                 
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{review.reviewContent}</p>
              </div>
              <div className="relative flex items-center mt-8 gap-x-4">
              <img
                          src={review.profilePicUrl ? `http://localhost:8080/${review.profilePicUrl.replace(/\\/g, "/")}` : ""} // Assuming the server is running on localhost:8080
                          className="w-12 h-12 rounded-full bg-gray-50"
                          alt={`Profile of ${review.firstName} ${review.lastName}`}
                        />
                
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a>
                      <span className="absolute inset-0" />
                      <div className="flex flex-row text-base font-semibold">
                            <div>{review.firstName}</div>
                            <div className="ml-1">{review.lastName}</div>
                      </div>
                    </a>
                  </p>
                  <p className="text-gray-600">{review.email}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
 
        </div>
      </section>
    </div>
  );
};

export default AddReview;
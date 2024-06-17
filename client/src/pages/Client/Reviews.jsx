
import React, { useState, useEffect } from "react";
import SideNavigationClient from "../../components/Client/SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import { PiFilesBold } from "react-icons/pi";
import { format } from 'date-fns'; // Import date-fns for formatting dates
import ReviewService from "../../services/ReviewService";

// Define Reviews component
const Reviews = () => {
  // State variables
  const [open, setOpen] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from service on component mount
  useEffect(() => {
    reviewsList().then((response) => {
      setReviews(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  // Sample data for posts
  {/*const posts = [{
    id: 1,
    title: 'Timely Delivery',
    href: '#',
    description:
      "We couldn't be happier with the punctuality of this construction team. The project was completed well within the agreed-upon timeline, showcasing their efficiency and dedication to delivering on time. It's rare to find such reliability in the construction industry.",
    date: 'Feb 16, 2024',
    datetime: '2024-02-16',
    category: { title: 'Review', href: '#' },
    author: {
      name: 'Michael Foster',
      id: 'CL 2345',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // Add more posts as needed
  ]; */}

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
                  <PiFilesBold size={100} color="#001b5e"/>
                  <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">Reviews</h1></div>
                </div>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Your valuable review is instrumental in ensuring that our project aligns seamlessly with your expectations and aspirations.
                </p>
              </div>
              {/* Render reviews */}
              <div className="grid max-w-2xl grid-cols-1 pt-10 pb-20 mx-auto mt-2 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {reviews.map((review) => (
                  <article
                    key={review.reviewID}
                    className="flex flex-col items-start justify-between max-w-xl"
                  >
                    <div className="flex items-center text-xs gap-x-4">
                      <div className="text-gray-500">
                        {review.reviewedDate}
                      </div>
                    </div>
                    <div className="relative group">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">                     
                        {review.reviewTitle}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                        {review.reviewContent}
                      </p>
                    </div>
                    <div className="relative flex items-center mt-8 gap-x-4">
                      <img src={review.user.profilePicUrl} alt="" className="w-10 h-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">                   
                      <span className="absolute inset-0" />
                      <div className="flex flex-row text-base font-semibold">
                        <div>{review.user.firstName}</div>
                        <div className="ml-1">{review.user.lastName}</div>
                    </div>      
                  </p>
                  <p className="text-gray-600">{review.user.email}</p>
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

export default Reviews;




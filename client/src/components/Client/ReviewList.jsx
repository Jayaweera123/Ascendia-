// Home.jsx
{/*import React, { useState } from "react";


import { format } from 'date-fns'; // Import date-fns for formatting dates
import { reviewList } from "../../services/ReviewService";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const [open, setOpen] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const { user } = useParams();
  const { firstName } = useParams();
  

  
  

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addedDate: '',
  });
  const navigator = useNavigate();

  useEffect(() => {
    reviewList().then((response) => {
        setReviews(response.data);
    }).catch(error => {
        console.error(error);
    })
    
  }, []);


  

  

  


  return (
    

      

       
        <div className="grid max-w-2xl grid-cols-1 pt-10 pb-20 mx-auto mt-2 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="flex flex-col items-start justify-between max-w-xl">
              <div className="flex items-center text-xs gap-x-4">
                <time dateTime={review.datetime} className="text-gray-500">
                  {review.date}
                </time>
                
              </div>
              <div className="relative group">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={review.href}>
                    <span className="absolute inset-0" />
                    {review.title}
                  </a>
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{review.description}</p>
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
                  <p className="text-gray-600">{review.user.userID}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
       

      
  );
};

export default ReviewList;*/}

import React, { useState, useEffect } from "react";
import SideNavigationClient from "../../components/Client/SideNavigationClient"; 
import SideNavigationPCTeam from "../../components/ProjectCreationTeam/SideNavigationPCTeam";
import SideNavigationPM from "../../components/ProjectManager/SideNavigationPM";
import SideNavigationStore from "../../components/Store/SideNavigationStore";
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import { MdOutlineRateReview } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import ReviewService from "../../services/ReviewService";
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

const Reviews = () => {
  const { projectId: projectIdParam } = useParams();
  const [open, setOpen] = useState(true);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [designation, setDesignation] = useState('');
  const [projectId, setProjectId] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const userDesignation = UserService.getDesignation();
      setDesignation(userDesignation);

      const token = localStorage.getItem("token");
      let projectId = projectIdParam;
      if (!projectId && token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.projectIDs && decodedToken.projectIDs.length > 0) {
          projectId = decodedToken.projectIDs[0]; // Fallback to first project ID from token
        }
      }

      if (projectId) {
        console.log("Fetching reviews for Project ID: ", projectId);
        setProjectId(projectId); // Set projectId state
        try {
          const response = await ReviewService.getAllReviews(token, projectId);
          console.log("API Response:", response);
          setReviews(response);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      } else {
        console.error("No project ID found in params or token.");
      }
    };

    fetchData();
  }, [projectIdParam]);

  const renderSideNavigation = () => {
    switch (designation) {
      case 'Store Keeper':
      case 'Quantity Surveyor':
        return <SideNavigationStore open={open} setOpen={setOpen} />;
      case 'Project Manager':
        return <SideNavigationPM open={open} setOpen={setOpen} />;
      case 'Project Creation Team':
        return <SideNavigationPCTeam open={open} setOpen={setOpen} />;
      default:
        return <SideNavigationClient open={open} setOpen={setOpen} />;
    }
  };

  return (
    <div>
      <TopNavigationClient />
      <section className="flex gap-6">
        {renderSideNavigation()}
        <div className="m-3 text-xl font-semibold text-gray-900">
          <div className="bg-white">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">  
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="flex flex-row gap-3 pt-2 pb-1 border-b items-centered border-gray-900/10">
                  
                  <div><h1 className="place-items-baseline text-4xl leading-relaxed py-4 font-bold text-left text-[#001b5e]">Reviews</h1></div>
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

export default Reviews;
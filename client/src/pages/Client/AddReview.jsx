// Home.jsx
import React, { useState, useParams } from "react";
import SideNavigationClient from "../../components/Client/SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "../../components/Client/TopNavigationClient";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";

import { format } from 'date-fns'; // Import date-fns for formatting dates

const AddReview = () => {
  const [open, setOpen] = useState(true);

  const [reviews, setReviews] = usestate
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const handlePopoverToggle = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };
  //const { userID } = useParams();

  const handleCancelClick = () => {
    // Add logic here to clear the form data
    console.log('Form data cleared!');
  };

  const handleSubmit = () => {
    // Handle the submission of the review, e.g., send it to a server or log it.
    const currentDateAndTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log('Review submitted:', { reviewText, currentDateAndTime });
    // You can customize this logic based on your project requirements.
    setIsPopoverOpen(false); // Close the popover after submission
  };

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

  {
    id: 1,
    title: 'Responding to CL 2345',
    href: '#',
    description:
      'The quality of work delivered by this construction team is unparalleled. From the materials used to the craftsmanship displayed, every aspect of the project reflects a commitment to excellence. Our expectations were not just met but exceeded in terms of the final products quality.',
    date: 'Feb 20, 2024',
    datetime: '2020-02-20',
    category: { title: 'Respond', href: '#' },
    author: {
      name: 'Saman Peiris',
      id: 'PR 1098',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },

  {
    id: 1,
    title: 'Quality Beyond Measure',
    href: '#',
    description:
      "We couldn't be happier with the punctuality of this construction team. The project was completed well within the agreed-upon timeline, showcasing their efficiency and dedication to delivering on time. It's rare to find such reliability in the construction industry.",
    date: 'Feb 12, 2024',
    datetime: '2024-02-12',
    category: { title: 'Review', href: '#' },
    author: {
      name: 'Michael Foster',
      id: 'CL 2345',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },

  {
    id: 1,
    title: 'Responding to CL 2345',
    href: '#',
    description:
      'The quality of work delivered by this construction team is unparalleled. From the materials used to the craftsmanship displayed, every aspect of the project reflects a commitment to excellence. Our expectations were not just met but exceeded in terms of the final products quality.',
    date: 'Feb 14, 2024',
    datetime: '2020-02-14',
    category: { title: 'Respond', href: '#' },
    author: {
      name: 'Saman Peiris',
      id: 'PR 1098',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]*/}


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

        {/*Popover*/}
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

      {isPopoverOpen && (
        <form action="https://getform.io/f/7675bf41-8d9b-43d9-99d7-c52b46d7cd96" method="POST" encType="multipart/form-data">
        
            
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-12">
       
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
                  Date
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
  
              
              <br></br>
  

              <div className="sm:col-span-9">
                <label htmlFor="RTitle" className="block text-base font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="RTitle"
                    id="RTitle"
                    autoComplete="RTitle"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>

              <div className="col-span-full">
              <label htmlFor="content" className="block text-base font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={7}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>   
          </div>
 
        <div className="flex items-center justify-end mt-6 gap-x-6">
          <button
            type="button"
            className="px-3 py-2 text-xl font-semibold leading-6 text-gray-900 bg-gray-300 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-xl font-semibold text-white bg-[#001b5e] rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
          </button>
        </div>
        
      </form>
      )}
    </div>

        {/*Reviews*/}
        <div className="grid max-w-2xl grid-cols-1 pt-10 pb-20 mx-auto mt-2 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between max-w-xl">
              <div className="flex items-center text-xs gap-x-4">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="relative group">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{post.description}</p>
              </div>
              <div className="relative flex items-center mt-8 gap-x-4">
                <img src={post.author.imageUrl} alt="" className="w-10 h-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.author.id}</p>
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

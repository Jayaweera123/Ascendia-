// Home.jsx
import React, { useState } from "react";
import SideNavigationClient from "./SideNavigationClient"; // Adjust the path based on your project structure
import TopNavigationClient from "./TopNavigationClient";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { format } from 'date-fns'; // Import date-fns for formatting dates

const ReviewCheck = () => {
  const [open, setOpen] = useState(true);
  

  const posts = [{
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
]


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
            <article key={review.id} className="flex flex-col items-start justify-between max-w-xl">
              <div className="flex items-center text-xs gap-x-4">
                <time dateTime={review.datetime} className="text-gray-500">
                  {review.date}
                </time>
                <a
                  href={review.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {review.category.title}
                </a>
              </div>
              <div className="relative group">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={review.href}>
                    <span className="absolute inset-0" />
                    {review.title}
                  </a>
                </h3>
                <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{post.description}</p>
              </div>
              <div className="relative flex items-center mt-8 gap-x-4">
                <img src={review.author.imageUrl} alt="" className="w-10 h-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href={review.author.href}>
                      <span className="absolute inset-0" />
                      {review.author.name}
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

export default ReviewCheck;

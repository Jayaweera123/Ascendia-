import React from "react";

const TopNavigation = () => {
  return (
    <>
            <style jsx>{`
                .content-padding {
                    padding-top: 4rem; /* Adjust this value based on the height of your fixed navigation bar */
                }
            `}</style>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900">
                <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ascendia</span>
                    </a>
                    <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
          </div>
                    
                    </div>
                </nav>
                <div className="content-padding"></div>
            </>
  );
};


export default TopNavigation;
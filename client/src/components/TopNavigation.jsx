import React from "react";

const TopNavigation = () => {
  return (
    <nav className="relative border-gray-200 dark:bg-gray-900">
      <div className="absolute inset-0 bg-white" aria-hidden="true"></div>
      <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#001b5e]">Ascendia</span>
        </a>
        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          {/* Notification Icon */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-4 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0067 16.1485C9.50934 16.0819 9.01246 16.0049 8.51605 15.9174C8.18297 15.8675 7.84724 15.8159 7.51158 15.7634C7.13746 15.7059 6.78725 15.6413 6.46117 15.5701C6.35911 15.5471 6.25968 15.523 6.16225 15.4981C5.63875 15.374 5.14815 15.2318 4.68129 15.0716C4.2729 14.9259 3.88464 14.7662 3.52657 14.5905C3.43978 14.5518 3.36056 14.5145 3.27982 14.4748C3.11052 14.3983 2.94847 14.3135 2.79047 14.2205C2.79357 14.2195 2.7967 14.2185 2.79983 14.2175C2.7967 14.2145 2.79357 14.2135 2.79047 14.2125C2.94847 14.1194 3.11052 14.0346 3.27982 13.9581C3.36056 13.9184 3.43978 13.8811 3.52657 13.8414C3.88464 13.6657 4.2729 13.505 4.68129 13.3593C5.14815 13.1991 5.63875 13.0569 6.16225 12.9328C6.25968 12.9079 6.35911 12.8838 6.46117 12.8609C6.78725 12.7896 7.13746 12.7251 7.51158 12.6676C7.84724 12.616 8.18297 12.5645 8.51605 12.5146C9.01246 12.4271 9.50934 12.3501 10.0067 12.2835C10.0583 11.2523 10.9391 10.432 12 10.432C13.0609 10.432 13.9417 11.2523 13.9933 12.2835C14.4907 12.3501 14.9875 12.4271 15.4839 12.5146C15.817 12.5645 16.1528 12.616 16.4884 12.6676C16.8625 12.7251 17.2127 12.7896 17.5388 12.8609C17.6368 12.8838 17.7363 12.9079 17.8338 12.9328C18.3573 13.0569 18.8479 13.1991 19.3147 13.3593C19.7231 13.505 20.1114 13.6657 20.4694 13.8414C20.5562 13.8811 20.6354 13.9184 20.7162 13.9581C20.8855 14.0346 21.0475 14.1194 21.2055 14.2125C21.2024 14.2135 21.1992 14.2145 21.1961 14.2175C21.1992 14.2185 21.2024 14.2195 21.2055 14.2205C21.0475 14.3135 20.8855 14.3983 20.7162 14.4748C20.6354 14.5145 20.5562 14.5518 20.4694 14.5905C20.1114 14.7662 19.7231 14.9259 19.3147 15.0716C18.8479 15.2318 18.3573 15.374 17.8338 15.4981C17.7363 15.523 17.6368 15.5471 17.5388 15.5701C17.2127 15.6413 16.8625 15.7059 16.4884 15.7634C16.1528 15.8159 15.817 15.8675 15.4839 15.9174C14.9875 16.0049 14.4907 16.0819 13.9933 16.1485C13.9417 17.1796 13.0609 18 12 18C10.9391 18 10.0583 17.1796 10.0067 16.1485Z"
                fill="#000"
              />
            </svg>
          </button>
          {/* Search Bar */}
          {/*<div className="relative hidden md:block md:mr-4">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
  </div>*/}
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </button>
        </div>
      </div>
      <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {/* Removed Home, About, and Services links */}
        </ul>
      </div>
    </nav>
  );
};

export default TopNavigation;
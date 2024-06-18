import React from 'react';
import { IoIosNotifications } from "react-icons/io";

const TopNavigationStore = ({ notificationHandler }) => {
    return (
        <nav className="relative border-gray-200 dark:bg-gray-900">
            <div className="absolute inset-0 bg-white" aria-hidden="true"></div>
            <div className="relative flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ascendia</span>
                </a>
                <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        onClick={() => notificationHandler(true)}
                        className="relative flex text-sm bg-white rounded-full md:me-4 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded="false"
                        data-dropdown-toggle="user-dropdown"
                        data-dropdown-placement="bottom"
                    >
                        <span className="sr-only">Open user menu</span>
                        <IoIosNotifications className="text-2xl" />
                        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigationStore;

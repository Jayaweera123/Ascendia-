// import React from 'react';
// import { getAllNotifications } from '../../services/StoreServices';

// const NotificationBar = ({ isOpen, notificationHandler}) => {
//     if (!isOpen) return null;

//     const userId = localStorage.getItem('userID');
//     const [notifications, setNotifications] = useState([])

//     //Get all notifications
//     useEffect(() => {
//         getAllNotifications(userId)
//         .then((response) => {
//             setNotifications(response.data);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
//     }, []);

//     return (
//         <div className="fixed right-0 z-50 h-screen overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-16 w-80">
//             <div className="p-4 border-b">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-lg font-semibold">Notifications</h2>
//                     <button
//                         onClick={() => notificationHandler(false)}
//                         className="text-gray-500 hover:text-gray-700"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             <div className="p-4">
//                 <div className="flex items-center p-2 hover:bg-gray-100">
//                     <div className="w-10 h-10 bg-red-500 rounded-full"></div>
//                     <div className="ml-3">
//                         <p className="text-sm text-gray-700"><strong>Jane Doe</strong> commented on your post</p>
//                         <p className="text-xs text-gray-500">2 hours ago</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center p-2 hover:bg-gray-100">
//                     <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
//                     <div className="ml-3">
//                         <p className="text-sm text-gray-700"><strong>Jane Doe</strong> liked your photo</p>
//                         <p className="text-xs text-gray-500">4 hours ago</p>
//                     </div>
//                 </div>
//                 {/* Add more notifications here */}
//             </div>
//         </div>
//     );
// };

// export default NotificationBar;

import React, { useState, useEffect } from 'react';
import { getAllNotifications } from '../../services/StoreServices';

const NotificationBar = ({ isOpen, notificationHandler }) => {
    const [notifications, setNotifications] = useState([]);

    // Get all notifications
    useEffect(() => {
        if (isOpen) {
            const userId = localStorage.getItem('userID');
            getAllNotifications(userId)
                .then((response) => {
                    setNotifications(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 z-50 h-screen overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-16 w-80">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <button
                        onClick={() => notificationHandler(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-100">
                        {/* <div className={`w-10 h-10 rounded-full ${notification.type === 'comment' ? 'bg-red-500' : 'bg-blue-500'}`}></div> */}
                        {/* <div className="w-10 h-10 rounded-full" ></div> */}
                        <div className="ml-3">
                            <p className="text-sm text-gray-700">
                                <strong>{notification.userId}</strong> {notification.content}
                            </p>
                            <p className="text-xs text-gray-500">{notification.notifyDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationBar;


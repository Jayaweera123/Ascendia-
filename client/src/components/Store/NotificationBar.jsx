import React, { useState, useEffect } from 'react';
import { getAllNotifications, setAsNotificationSeen } from '../../services/StoreServices';

const NotificationBar = ({ isOpen, notificationHandler }) => {

    const [notifications, setNotifications] = useState([]);

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        if (isNaN(date)) return { formattedDate: '', formattedTime: '' }; // Handle invalid dates
        const formattedDate = date.toLocaleDateString(); // Format date
        const formattedTime = date.toLocaleTimeString(); // Format time
        return { formattedDate, formattedTime };
    };

    // Fetch all notifications when the notification bar is open
    useEffect(() => {
        if (isOpen) {
            const userId = localStorage.getItem('userID');
            getAllNotifications(userId)
                .then((response) => {
                    const sortedNotifications = response.data.sort((a, b) => new Date(b.notifyDate) - new Date(a.notifyDate));
                    setNotifications(sortedNotifications);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [isOpen]);

    // Do not render the notification bar if it is not open
    if (!isOpen) return null;

    // Handle click on a notification to mark it as seen
    const handleClick = (notificationId, index) => {
        setAsNotificationSeen(notificationId, { isSeen: 'seen' })
            .then((response) => {
                // Update the local state to reflect the change
                setNotifications((prevNotifications) => {
                    const updatedNotifications = [...prevNotifications];
                    updatedNotifications[index].isSeen = 'seen';
                    return updatedNotifications;
                });
            })
            .catch((error) => {
                console.error('Error setting notification as seen:', error);
            });
    };

    return (
        <div className="fixed right-0 z-50 h-screen overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-16 w-80">
             {/* Notification bar header */}
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <button
                        onClick={() => notificationHandler(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {/* Close button icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

             {/* Notifications list */}
            <div>
                {notifications.map((notification, index) => {
                    const { formattedDate, formattedTime } = formatDateTime(notification.notifyDate);
                    const bgColor = notification.isSeen === 'seen' ? 'bg-white' : 'bg-sky-50';

                    return (
                        <div key={index} className={`flex items-center p-2 pt-3 pb-3 pl-3 pr-3 hover:bg-gray-100 ${bgColor}`}>
                            <button onClick={() => handleClick(notification.notificationId, index)}>
                                <div className="ml-3">
                                    <p className="text-sm text-left text-red-500">
                                        <strong>{notification.content}</strong>
                                    </p>
                                    <p className="text-xs text-left text-gray-500">
                                        <span>{formattedDate}</span>
                                        <span style={{ marginRight: '2em' }}></span>
                                        <span>{formattedTime}</span>
                                    </p>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationBar;

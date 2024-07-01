import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotifications } from "react-icons/io";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../../shim/global.js';
import { markAllNotificationsAsSeen, getUnseenNotifications } from '../../services/StoreServices';

const TopNavigationStore = ({ notificationHandler }) => {

    /*************************Notification code************************************************/

    const [privateMessage, setPrivateMessage] = useState('');
    const [newNotification, setNewNotification] = useState(false); // Add this line
    const stompClientRef = useRef(null);
    const [notifications, setNotifications] = useState([]);
    const [newNotificationCount, setNewNotificationCount] = useState(0); // Assuming you have a state setter named setMaterialCount
    
    const userId = localStorage.getItem('userID');
    console.log('UserId', userId); // This will log the userID value

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtain the JWT token
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
        console.log('Token:', token);

        const socket = new SockJS('http://localhost:8080/websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                'Authorization': `Bearer ${token}`
            },
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe('/user/' + userId + '/private', (response) => {
                    console.log('Received private message:', response.body);
                    var payloadData = JSON.parse(response.body);
                    setPrivateMessage(payloadData.content);
                    setNewNotification(true); // Ensure this line is executed
                    console.log('privateMessage', privateMessage);
                    console.log('New Notification', newNotification);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            stompClient.deactivate();
        };
    },[]);

    // Fetch unseen notifications on component mount
    useEffect(() => {
        
            const userId = localStorage.getItem('userID');
            getUnseenNotifications(userId)
                .then((response) => {
                    const sortedNotifications = response.data.sort((a, b) => new Date(b.notifyDate) - new Date(a.notifyDate));
                    setNotifications(sortedNotifications);
                    setNewNotificationCount(response.data.length); // Assuming you have a state setter named setMaterialCount
                    console.log('newNotificationCount', newNotificationCount);
                })
                .catch((error) => {
                    console.error(error);
                });
        
    }, []);

    // Update new notification state based on count
    useEffect(() => {
        if(newNotificationCount > 0){
            setNewNotification(true);
        }
    },[newNotificationCount]);

    // Handle click on notification icon
    const handleNotificationClick = () => {
        markAllNotificationsAsSeen(userId)
            .then(() => {
                notificationHandler(true);
                setNewNotification(false);
            })
            .catch((error) => {
                console.error('Error marking all notifications as seen:', error);
            });
    };


    /*************************Notification code************************************************/

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
                        <button
                            type="button"
                            onClick={handleNotificationClick}
                            className="relative flex text-sm bg-white rounded-full md:me-4 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <span className="sr-only">Open user menu</span>
                            <IoIosNotifications className="text-2xl" />
                            {newNotification && (
                                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                            )}
                        </button>
                    </div>
                    
                </div>
            </nav>
            <div className="content-padding"></div>
        </>
    );
};

export default TopNavigationStore;






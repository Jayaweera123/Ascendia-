import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotifications } from "react-icons/io";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import Swal from 'sweetalert2'; // Import SweetAlert2
import '../../shim/global.js';

const TopNavigationStore = ({ notificationHandler }) => {

    /*************************Notification code************************************************/

    const [privateMessage, setPrivateMessage] = useState('');
    const [newNotification, setNewNotification] = useState(false); // Add this line
    const stompClientRef = useRef(null);
    
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
                    // Swal.fire({
                    //     title: 'New Notification',
                    //     text: payloadData.content,
                    //     icon: 'info',
                    //     confirmButtonText: 'OK'
                    // });
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



    /*************************Notification code************************************************/

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
                        {newNotification && (
                            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                        )}
                    </button>
                </div>
                <p>{privateMessage}</p>
            </div>
        </nav>
    );
};

export default TopNavigationStore;

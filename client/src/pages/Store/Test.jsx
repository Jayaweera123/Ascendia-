import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../../shim/global.js';

const Test = () => {
    const [message, setMessage] = useState('');
    const [privateMessage, setPrivateMessage] = useState('');
    const stompClientRef = useRef(null);
    const [userData, setUserData] = useState({
        userId: '',
        message: ''
    });

    // Assuming this code is in a React component or a related function
const userId = localStorage.getItem('userID');
console.log('UserId',userId); // This will log the userID value


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
                stompClient.subscribe('/public/greetings', (response) => {
                    console.log('Received message:', response.body);
                    setMessage(JSON.parse(response.body).content);
                });
                stompClient.subscribe('/user/' + userId + '/private', (response) => {
                    console.log('Received private message:', response.body);
                    var payloadData = JSON.parse(response.body);
                    setPrivateMessage(payloadData.message);
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
    }, [userData.userId]); // Add userId as dependency to handle subscriptions correctly

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    }

    const handleUserId = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, userId: value });
    }

    const sendPrivateMessage = () => {
        const stompClient = stompClientRef.current;
        if (stompClient && stompClient.connected) {
            const chatMessage = {
                userId: userData.userId,
                message: userData.message,
            };

            console.log('Sending private message:', chatMessage);
            stompClient.publish({
                destination: '/app/private-message',
                body: JSON.stringify(chatMessage),
            });
            setUserData({ ...userData, message: '' });

        } else {
            console.error('Stomp client is not connected');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter userId" 
                value={userData.userId} 
                onChange={handleUserId} 
            />
            <input 
                type="text" 
                placeholder="Enter message" 
                value={userData.message} 
                onChange={handleMessage} 
            />
            <button onClick={sendPrivateMessage}>Send</button>
            <p>{privateMessage}</p>
        </div>
    );
};

export default Test;

import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../../shim/global.js';

const Test = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const stompClientRef = useRef(null);

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
                stompClient.subscribe('/topic/greetings', (response) => {
                    console.log('Received message:', response.body);
                    setMessage(JSON.parse(response.body).content);
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
    }, []);

    const sendMessage = () => {
        const stompClient = stompClientRef.current;
        if (stompClient && stompClient.connected) {
            console.log('Sending message:', name);
            stompClient.publish({
                destination: '/app/hello',
                body: name,
            });
        } else {
            console.error('Stomp client is not connected');
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
            <p>{message}</p>
        </div>
    );
};

export default Test;
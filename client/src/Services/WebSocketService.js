// websocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connect = (callback) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
        stompClient.subscribe('/topic/messages', (message) => {
            callback(JSON.parse(message.body));
        });
    }, (error) => {
        console.error('Error connecting to WebSocket', error);
    });
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    }
};

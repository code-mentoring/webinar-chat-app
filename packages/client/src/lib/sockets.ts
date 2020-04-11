import io from 'socket.io-client';

// const socket = io();

// socket.connect();
const adminSocket = io('http://localhost:9999', { forceNew: true });
adminSocket.connect();


adminSocket.send('hello');

import io from 'socket.io-client';

const adminSocket = io('http://localhost:9999', { forceNew: true });
adminSocket.connect();

adminSocket.send('hello');

import io from 'socket.io-client';

const adminSocket = io('%%API_URL%%', { forceNew: true });
adminSocket.connect();

adminSocket.send('hello');

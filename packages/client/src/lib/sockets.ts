import io, {} from 'socket.io-client';

const adminSocket = io('%%API_URL%%', { forceNew: true });
adminSocket.connect();

export const joinRoom = (convoID: string) => {
  adminSocket.emit('room', convoID);
};


adminSocket.on('message', (m: any) => {
  console.log(m);
});

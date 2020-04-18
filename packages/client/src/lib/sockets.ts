import io, {} from 'socket.io-client';

export const adminSocket = io('%%API_URL%%', { forceNew: true });
adminSocket.connect();

export const joinRoom = (convoID: string) => {
  adminSocket.emit('room', convoID);
};

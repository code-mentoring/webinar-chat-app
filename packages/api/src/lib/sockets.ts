import { Server } from 'socket.io';
import { Message } from '../models/Message';

let server: Server;

export default (s: Server) => {
  server = s;
  s.on('connection', (socket) => {
    console.log('Got a connection');
    socket.on('room', room => socket.join(room));
  });
};

export const messageRoom = (convoID: string, message: Message) => {
  server.sockets.in(convoID).emit('message', message.toJSON());
};

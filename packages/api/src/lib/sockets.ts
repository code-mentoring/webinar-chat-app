import { Server } from 'socket.io';

export default (s: Server) => {
  s.on('connection', () => {
    console.log('Got a connection');
  });
};

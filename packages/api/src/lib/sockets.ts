import { Server } from 'socket.io';

export default (s: Server) => {
  s.on('connection', (socket) => {
    console.log('Got a connection');

    socket.on('message', function (message: string) {
      console.log(message);
    });
  });
};

import { Server, Socket } from 'socket.io';

const state = {} as any;

export default function (io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('socket connected', socket.id);
    socket.on('join room', (room) => {
      socket.join(room);
    });
    socket.on('disconnect', (reason) => {
      console.log('socket disconnected');
      io.emit('user disconnected', socket.id);
      delete state[socket.id];
    });
    socket.on('move', (e: any) => {
      // console.log(':move', e);
      state[socket.id] = e;
      socket.emit('state', state);
      socket.broadcast.emit('state', state);
    });
  });
}

import { Server } from 'socket.io';

const state = {} as any;

const io = new Server(3333, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('Connection', socket.id);
});

io.on('connect', (socket) => {
  socket.emit('hello', `welcome ${socket.id}`);
  socket.on('disconnecting', () => {
    console.log('disconnected', socket.id);
    socket.broadcast.emit('message', `${socket.id} left`);
    delete state[socket.id];
  });
  socket.on('move', (e: any) => {
    // console.log(':move', e);
    state[socket.id] = e;
    socket.emit('state', state);
    socket.broadcast.emit('state', state);
  });
});

export default defineEventHandler(() => {});

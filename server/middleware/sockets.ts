import { Server } from 'socket.io'

const state = {} as any;
let server: any = null

export default defineEventHandler((event) => {
  if (!server) {
    // @ts-expect-error: Nuxt3
    server = event.node.res.socket?.server
    const io = new Server(server);
    // cors: {origin: '*'}

    io.on('connection', (socket) => {
      console.log('Connected', socket.id);

      socket.on('move', (e: any) => {
        // console.log(':move', e);
        state[socket.id] = e;
        socket.emit('state', state);
        socket.broadcast.emit('state', state);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected', socket.id);
        delete state[socket.id];
      })
    })
  }
})

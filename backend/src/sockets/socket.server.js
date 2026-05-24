import { Server } from 'socket.io';

let io;

export const initSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join project room
    socket.on('joinProject', (projectId) => {
      socket.join(`project_${projectId}`);
      console.log(`User ${socket.id} joined project_${projectId}`);
    });

    // Live task updates
    socket.on('taskUpdated', (data) => {
      io.to(`project_${data.projectId}`).emit('taskUpdated', data);
    });

    // Real-time comments
    socket.on('newComment', (data) => {
      io.to(`project_${data.projectId}`).emit('newComment', data);
    });

    // Notifications
    socket.on('sendNotification', (data) => {
      io.to(`project_${data.projectId}`).emit('receiveNotification', data);
    });

    // User presence
    socket.on('userOnline', (data) => {
      io.to(`project_${data.projectId}`).emit('userOnline', data);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const configureSocket = (server) => {
  if (!io) {
    initSocketServer(server);
  }
};

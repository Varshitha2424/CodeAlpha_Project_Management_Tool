import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

export const joinProjectRoom = (projectId) => {
  socket.emit('joinProject', projectId);
};

export const sendTaskUpdate = (data) => {
  socket.emit('taskUpdated', data);
};

export const sendNewComment = (data) => {
  socket.emit('newComment', data);
};

export const sendNotification = (data) => {
  socket.emit('sendNotification', data);
};

export const setUserOnline = (data) => {
  socket.emit('userOnline', data);
};

export default socket;
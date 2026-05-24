import React, { createContext, useEffect } from 'react';
import socket from '../sockets/socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const VisitorCounter = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Socket.IO Client Connected');
    });

    socket.on('userCountUpdate', (count) => {
      setUserCount(count);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO Client Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Active Users: {userCount}</div>;
};

export default VisitorCounter;

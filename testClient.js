const { io } = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3000');

// Subscribe to a room
const userId = 1;
socket.emit('subscribe', userId);

// Listen for updates
socket.on('earning_update', (data) => {
  console.log('Real-time update received:', data);
});

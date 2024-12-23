require('dotenv').config()
const express = require('express');

const app = express();
const http = require('http'); // Required for socket.io
const { Server } = require('socket.io');

const db = require('./config/databaseConfig');
const PORT = process.env.PORT || 8080
const server = http.createServer(app);
const io = new Server(server); 



db.sequelize.sync({force: false}).then(()=>{
    console.log("Database synced")
})

const referralRoutes = require('./routes/routes');

app.use(express.json())



io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Handle user-specific notifications
    socket.on('subscribe', (userId) => {
      console.log(`User ${userId} subscribed to notifications`);
      socket.join(`user_${userId}`); // Join a room for the user
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    }); 
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use('/referral', referralRoutes);

server.listen(PORT, ()=>{
    console.log("server is running")
})
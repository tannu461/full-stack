const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

// allow client origin, change if needed
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // join event not strictly needed for single room but useful
  socket.on('join', (username) => {
    socket.data.username = username || 'Anonymous';
    io.emit('user-joined', { id: socket.id, username: socket.data.username });
  });

  socket.on('message', (payload) => {
    // payload: { name, text }
    const timestamp = new Date().toISOString();
    const message = {
      id: socket.id,
      name: payload.name,
      text: payload.text,
      time: timestamp
    };
    // broadcast to all clients (including sender)
    io.emit('message', message);
  });

  socket.on('disconnect', (reason) => {
    console.log('Client disconnected:', socket.id);
    io.emit('user-left', { id: socket.id, username: socket.data.username });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Socket.io server running on port ${PORT}`));

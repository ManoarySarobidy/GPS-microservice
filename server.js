const express = require('express');
const { updateAllPositions } = require('./src/services/movementService');
const gpsRoutes = require('./src/routes/gpsRoutes');
const config = require('./config/config');
const app = express();
const PORT = 3000;

const WebSocket = require('ws');

const socketIo = require('socket.io');
const http = require('http');

const io = new WebSocket.Server( {port: 7000} );

app.use(express.json());
app.use('/coordinates', gpsRoutes);
// Routes
app.get('/api/persons', (req, res) => {
  res.json(config.people);
});

app.get('/api/persons/:id', (req, res) => {
  const person = config.people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ message: 'Person not found' });
  res.json(person);
});


io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Listen for messages from Laravel client
  socket.on('message', (data) => {
      console.log('Received message from Laravel:', data);
      // Send a message back to Laravel
      socket.emit('message', { message: 'Hello from Node.js' });
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });

});

// Mettre à jour les positions toutes les `X` millisecondes
setInterval(() => {
  updateAllPositions();
  console.log('Positions updated:', config.people.map(p => p.currentPosition));
}, config.interval);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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


// Mettre à jour les positions toutes les `X` millisecondes
setInterval(() => {
  updateAllPositions();
  console.log('Positions updated:', config.people.map(p => p.currentPosition));
}, config.interval);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

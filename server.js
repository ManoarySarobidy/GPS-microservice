const express = require('express');
const { updateAllPositions } = require('./src/services/movementService');
const gpsRoutes = require('./src/routes/gpsRoutes');
const config = require('./config/config');
const axios = require('axios'); 
const app = express();
const PORT = 3000;

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());


app.use('/api', gpsRoutes);

// Routes pour l'API GPS

// Mettre à jour les positions toutes les `X` millisecondes
// setInterval(() => {
//   updateAllPositions();
//   // console.log('Positions updated:', config.people.map(p => p.currentPosition));
// }, config.interval);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

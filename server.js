const express = require('express');
const dotenv = require('dotenv');
const gpsRoutes = require('./src/routes/gpsRoutes');

dotenv.config(); // Charger les variables d'environnement du fichier .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Utiliser les routes GPS
app.use('/api', gpsRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port  http://localhost:${port}`);
});

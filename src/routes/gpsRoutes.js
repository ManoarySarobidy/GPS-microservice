const express = require('express');
const router = express.Router();
const gpsController = require('../controllers/gpsController');

// Route pour récupérer les coordonnées d'une personne
router.get('/:id', gpsController.getCoordinates);
router.get('/people', gpsController.getPersons);

module.exports = router;

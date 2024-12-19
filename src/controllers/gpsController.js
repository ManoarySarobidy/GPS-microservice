// const { getCoordinatesForPerson } = require('../services/movementService');
const { generateCoordinatesForPerson } = require('../services/movementService');

// Cette fonction est appelée quand une requête GET est envoyée à /api/people/:id/coordinates
exports.getCoordinates = (req, res) => {

  
  const personId = parseInt(req.params.id);
  const coordinates = generateCoordinatesForPerson(personId);

  if (!coordinates) {
    return res.status(404).json({ message: 'Person not found' });
  }

  res.json(coordinates);
};

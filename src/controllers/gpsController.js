const config = require('../../config/config');

exports.getCoordinates = (req, res) => {
  const personId = parseInt(req.params.id);
  const person = config.people.find(p => p.id === personId);

  if (!person) {
    return res.status(404).json({ message: 'Person not found' });
  }

  console.log(`Coordinates for ${person.name}:`, person.currentPosition);
  res.json(person.currentPosition);
};

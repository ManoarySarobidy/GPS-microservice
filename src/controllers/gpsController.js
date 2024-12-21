const config = require('../../config/config');
const persons = require('../services/personsService');
const coordinates = require('../services/movementService');
// exports.getCoordinates = (req, res) => {
//   const personId = parseInt(req.params.id);
//   const person = config.people.find(p => p.id === personId);

//   if (!person) {
//     return res.status(404).json({ message: 'Person not found' });
//   }

//   console.log(`Coordinates for ${person.name}:`, person.currentPosition);
//   res.json(person.currentPosition);
// };

// Fonction pour mettre à jour la position d'une personne et envoyer à Laravel
// const updatePersonCoordinates = async (personId) => {
//   const person = config.people.find(p => p.id === personId);

//   if (!person) {
//     console.error(`Person with ID ${personId} not found`);
//     return;
//   }

//   const coordinate = coordinates.updatePersonPosition(person);
//   person.currentPosition = coordinate; 
//   await coordinates.sendCoordinatesToLaravel(person.id, coordinate.latitude, coordinate.longitude);
//   console.log(`Coordinates for ${person.name}:`, person.currentPosition, coordinate);
//   return person;
// };

exports.getCoordinates = (req, res) => {
  const personId = parseInt(req.params.id);
  const person = config.people.find(p => p.id === personId);

  if (!person) {
    return res.status(404).json({ message: 'Person not found' });
  }
  return res.json(person) ;

  // coordinates.sendCoordinatesToLaravel(person.id, person.startingCoordinates.latitude, person.startingCoordinates.longitude);
  // setInterval(async () => {
  //   return res.json(updatePersonCoordinates(personId)) ;
  // }, config.interval);
  // res.json(person.currentPosition);
};

exports.getPersons = () => {
  try {
    const p = persons.sendPersons();
    console.json('Send persons:', p);
  } catch (error) {
    console.error('Error saving person:', error.message);
  }

};

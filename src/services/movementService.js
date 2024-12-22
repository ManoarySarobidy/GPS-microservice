const config = require('../../config/config');
const axios = require('axios'); 

// Génère une distance aléatoire entre 0 et 50 mètres
const getRandomDistance = () => Math.random() * 50;

// Sélectionne une direction aléatoire parmi les directions disponibles
const getRandomDirection = () => {
  const randomIndex = Math.floor(Math.random() * config.directions.length);
  return config.directions[randomIndex];
};

// Calcule les nouvelles coordonnées en fonction de la direction
const moveInDirection = (currentPosition, direction) => {
  const degreesPerMeter = 0.000009; // Conversion approximative d'un mètre en degrés
  const distance = getRandomDistance();
  let newLatitude = currentPosition.latitude;
  let newLongitude = currentPosition.longitude;

  switch (direction) {
    case 'north':
      newLatitude += distance * degreesPerMeter;
      break;
    case 'south':
      newLatitude -= distance * degreesPerMeter;
      break;
    case 'east':
      newLongitude += distance * degreesPerMeter;
      break;
    case 'west':
      newLongitude -= distance * degreesPerMeter;
      break;
    case 'return':
      // Retourner aux coordonnées initiales
      newLatitude = currentPosition.latitude;
      newLongitude = currentPosition.longitude;
      break;
    default:
      break;
  }

  return { latitude: newLatitude, longitude: newLongitude };
};

// Met à jour la position d'une personne
const updatePersonPosition = (person) => {
  const randomDirection = getRandomDirection();
  const randomDistance = getRandomDistance();
  // console.log(`${person.name} moves ${randomDistance.toFixed(2)}m ${randomDirection}`);
  const newCoordinates = moveInDirection(person.currentPosition, randomDirection, randomDistance);
  // console.log(`${person.name}'s new position:`, newCoordinates);
  person.currentPosition = newCoordinates;
  person.last_time_seen = new Date().toISOString();
  return person;
};


// Fonction principale pour mettre à jour les positions de toutes les personnes
const updateAllPositions = () => {
  config.people.forEach(person => {
    return updatePersonPosition(person);

    // sendCoordinatesToLaravel(person.id, newCoordinates.latitude, newCoordinates.longitude);
  });
};


// Fonction pour envoyer les coordonnées à l'API Laravel
// async function sendCoordinatesToLaravel(user_id, latitude, longitude) {
//   try {
//     const timestamp = new Date().toISOString();
    
//     // Envoyer les coordonnées au backend Laravel
//     await axios.post(`http://127.0.0.1:8000/api/gps-coordinates/${user_id}`, {
//       user_id,
//       latitude,
//       longitude,
//       date_time: timestamp,
//     }).then( function(data) {
//       console.log(data);
//     } ).catch( function (error) {
//       console.error("lmmlqkmldkq " + error);
//     });
    
//     // console.log('Coordinates successfully saved:', response.data);
//   } catch (error) {
//     console.error('Error sending coordinates:', error);
//   }
// }

module.exports = {
  updateAllPositions,
  updatePersonPosition,
  // sendCoordinatesToLaravel,
};

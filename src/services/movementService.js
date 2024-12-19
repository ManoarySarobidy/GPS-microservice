const config = require('../../config/config');

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
  console.log(`${person.name} moves ${randomDistance.toFixed(2)}m ${randomDirection}`);
  const newCoordinates = moveInDirection(person.currentPosition, randomDirection, randomDistance);
  console.log(`${person.name}'s new position:`, newCoordinates);
  person.currentPosition = newCoordinates;
};


// Fonction principale pour mettre à jour les positions de toutes les personnes
const updateAllPositions = () => {
  config.people.forEach(person => {
    updatePersonPosition(person);
  });
};

module.exports = {
  updateAllPositions,
};

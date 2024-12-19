const config = require('../../config/config');

const generateCoordinatesForPerson = (personId) => {
    const person = config.people.find(p => p.id === personId);
    if (!person) return null;
  
    // Si nous avons épuisé tous les mouvements, recommencer depuis le début
    if (person.currentIndex >= person.movementPattern.length) {
      person.currentIndex = 0;  // Remise à zéro de l'index pour recommencer
    }
  
    const movement = person.movementPattern[person.currentIndex];
    const newCoordinates = moveInDirection(person.currentPosition, movement.direction, movement.distance);
    person.currentPosition = newCoordinates;
    person.currentIndex++;
  
    return newCoordinates;
  };
  
  // Fonction pour déplacer la personne en fonction de la direction et de la distance
  const moveInDirection = (currentPosition, direction, distance) => {
    const degreesPerMeter = 0.000009; // 1 mètre approximativement en degrés de latitude/longitude
    let newLatitude = currentPosition.latitude;
    let newLongitude = currentPosition.longitude;
    
    // Calcul des nouvelles coordonnées en fonction de la direction et de la distance
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
        // Retourner aux coordonnées initiales (point de départ)
        newLatitude = currentPosition.latitude; // Remet à la latitude initiale
        newLongitude = currentPosition.longitude; // Remet à la longitude initiale
        break;
      default:
        break;
    }

    // Générer une variation aléatoire entre -50 et 50 mètres
    const randomVariationDistance = Math.random() * 50; // Distance aléatoire entre 0 et 50 mètres
    const randomVariationLatitude = (Math.random() - 0.5) * 2 * randomVariationDistance * degreesPerMeter; // Variation aléatoire de latitude
    const randomVariationLongitude = (Math.random() - 0.5) * 2 * randomVariationDistance * degreesPerMeter; // Variation aléatoire de longitude

    // Appliquer la variation aléatoire
    newLatitude += randomVariationLatitude;
    newLongitude += randomVariationLongitude;

    return { latitude: newLatitude, longitude: newLongitude };
};

  
  module.exports = { generateCoordinatesForPerson };
module.exports = {
  people: [
    { 
      id: 1,
      name: "Person 1",
      startingCoordinates: { latitude: 48.8566, longitude: 2.3522 }, // Paris as an example
      currentPosition: { latitude: 48.8566, longitude: 2.3522 },
    },
    { 
      id: 2,
      name: "Person 2",
      startingCoordinates: { latitude: 40.7128, longitude: -74.0060 }, // New York as an example
      currentPosition: { latitude: 40.7128, longitude: -74.0060 },
    },
  ],
  directions: ['north', 'south', 'east', 'west', 'return'], // Ensemble des directions possibles
  interval: 5000, // Intervalle en millisecondes pour générer une nouvelle coordonnée
};

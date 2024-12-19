module.exports = {
  people: [
    { 
      id: 1,
      name: "Person 1",
      startingCoordinates: { latitude: 48.8566, longitude: 2.3522 }, // Paris as an example
      movementPattern: [
        { direction: 'east', distance: 1000 },
        { direction: 'north', distance: 2000 },
        { direction: 'east', distance: 200 },
        { direction: 'south', distance: 500 },
        { direction: 'west', distance: 2000 },
        { direction: 'south', distance: 1500 },
        { direction: 'return', distance: 0 }
      ],
      currentIndex: 0, // Index to keep track of the current movement step
      currentPosition: { latitude: 48.8566, longitude: 2.3522 },
    },
  ],
  interval: 5000 // Intervalle en millisecondes pour générer une nouvelle coordonnée
};

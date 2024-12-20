const config = require('../../config/config');
const axios = require('axios'); 

const sendPersons = () => {
  config.people.forEach(person => {
    sendPersonsToLaravel(person);
  });
};


// Fonction pour envoyer les coordonnées à l'API Laravel
async function sendPersonsToLaravel(user) {
  try {
    
    // Envoyer les coordonnées au backend Laravel
    const response = await axios.post('http://127.0.0.1:8000/api/users', {
      user_id: user.id,
      name: user.name,
      email: user.email,
    });
    
    console.log('Coordinates successfully saved:', response.data);
  } catch (error) {
    console.error('Error saving coordinates:', error.message);
  }
}

module.exports = {
    sendPersons,
  };
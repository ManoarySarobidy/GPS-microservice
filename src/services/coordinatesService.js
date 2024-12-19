const generateNewCoordinates = (lat, lon, distanceInMeters) => {
    const earthRadius = 6371000; // Rayon de la Terre en mètres
    const randomAngle = Math.random() * Math.PI * 2; // Angle aléatoire
  
    // Calcul des coordonnées
    const deltaLat = distanceInMeters / earthRadius;
    const deltaLon = distanceInMeters / (earthRadius * Math.cos(Math.PI * lat / 180));
  
    const newLat = lat + (deltaLat * Math.sin(randomAngle));
    const newLon = lon + (deltaLon * Math.cos(randomAngle));
  
    return {
      latitude: newLat,
      longitude: newLon
    };
  };
  
  module.exports = { generateNewCoordinates };
  
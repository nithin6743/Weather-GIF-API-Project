// Initialize the map India coordinates
let map = L.map('map').setView([22.5937, 78.9629], 5);

// Add OpenStreetMap layer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// Variable to store the marker
let currentMarker;
// Handle map clicks
let latitude, longitude;


map.on('click', function (e) {
  let { lat, lng } = e.latlng;

  latitude = lat;
  longitude = lng;
  console.log(`Selected Coordinates: Latitude: ${latitude}, Longitude: ${longitude}`);
  // Remove the previous marker if it exists
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  // Add a new marker at the clicked location
  currentMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`Coordinates:<br> Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`)
    .openPopup();
});

// tile layer(Stadia_OSM)
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=f5855062-a557-4018-8d6e-c03f13450bcd', {
  ext: 'png'
});
Stadia_AlidadeSmoothDark.addTo(map);




L.Control.geocoder().addTo(map);

//
let weather_api = "https://api.weatherapi.com/v1/current.json?key=9025db8dbabb430d952165219252901&q=17.465224782058666,78.54138010704175";

let pet_api = "https://api.giphy.com/v1/gifs/{GIF_ID}?api_key=xbzOMuOZIy2p0uPqHHyAjhs6QrQNQKht";

let Clear = "wHUWuJWg6iRRQWTBd1";
let Sunny = "khzLJR9sTppTUpBEia";
let Partly_Cloudy = "Oh1rKdcE3IFOpfeimr";
let Cloudy = "Oh1rKdcE3IFOpfeimr";
let Overcast = "Oh1rKdcE3IFOpfeimr";
let Mist = "dUR62cwTf5aMGMOmwy";
let Fog = "dUR62cwTf5aMGMOmwy";
let Light_Rain = "AQ60Mqpz7sJLK4DiOW";
let Heavy_Rain = "yGhTOpxFbAUhuBJG30";
let Thunderstorm = "eyoDFbM8UwpIsjG8iI"
let Light_Snow = "dwdBXHwYtuQV21eeF7";
let Heavy_Snow = "lOgHL3b6ogY6IEkq6q";
let Sleet = "dUR62cwTf5aMGMOmwy";
let Hail = "8hhfYrbc0XugC1XIeO";
let Windy = "lOgHL3b6ogY6IEkq6q";
let Hot = "xhC6odm0c5kFZQ5MGh";
let Cold = "dUR62cwTf5aMGMOmwy";
let Freezing_Fog = "dwdBXHwYtuQV21eeF7";
let Drizzle= "AQ60Mqpz7sJLK4DiOW";


// Initialize the map India coordinates
let map = L.map('map').setView([22.5937, 78.9629], 5);

// Add OpenStreetMap layer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// Variable to store the marker, latitude and longitude
let currentMarker;
let latitude, longitude;

// tile layer(Stadia_OSM)
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=f5855062-a557-4018-8d6e-c03f13450bcd', {
  ext: 'png'
});
Stadia_AlidadeSmoothDark.addTo(map);

// Search button on the map
L.Control.geocoder().addTo(map);

let loadMsg = document.querySelector(".loadMsg"); 
let location_msg = document.querySelector("#location");
let temperature = document.querySelector("#temperature");
let weatherText = document.querySelector("#weather");
let humidityText = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let weatherIcon = document.querySelector(".icon");

map.on('click', async function (e) {
  let { lat, lng } = e.latlng;
  latitude = lat;
  longitude = lng;
  let url = `https://api.weatherapi.com/v1/current.json?key=9025db8dbabb430d952165219252901&q=${latitude},${longitude}`;
  let response = await fetch(url);
  let location = await response.json();
  let place = location.location.name;
  let country = location.location.country;
  let temp_c = location.current.temp_c;
  let weather = location.current.condition.text;
  let humidity = location.current.humidity;
  let wind = location.current.wind_kph;
  let icon = location.current.condition.icon;
  let icon_url = `https:${icon}`;
  
  
  
  
  
  
  
  
  
  // Remove the previous marker if it exists
  if (currentMarker) {
    map.removeLayer(currentMarker);
  } 
  
  // Add a new marker at the clicked location
  currentMarker = L.marker([lat, lng])
  .addTo(map)
  .bindPopup(`Place: ${place}, Country: ${country}`)
  .openPopup();
  //removes the loading message
  if (loadMsg) {
    loadMsg.parentNode.removeChild(loadMsg);
  }
  // Display the weather details
  location_msg.innerHTML = `${place}, ${country}`;
  temperature.innerHTML = `${temp_c}°C`;
  weatherText.innerHTML = `${weather}`;
  humidityText.innerText = `${humidity}%`;
  windSpeed.innerText = `${wind}km/h`;
  weatherIcon.src = icon_url;

  
   
});
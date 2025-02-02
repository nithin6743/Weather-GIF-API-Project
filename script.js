// Initialize the map India coordinates
let map = L.map('map').setView([22.5937, 78.9629], 5);

// Add OpenStreetMap layer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// Add Stadia Alidade Smooth Dark layer
var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=f5855062-a557-4018-8d6e-c03f13450bcd', {
  ext: 'png'
});
Stadia_AlidadeSmoothDark.addTo(map);

// Variable to store the marker
let currentMarker;

// UI Elements
let loadMsg = document.querySelector(".loadMsg"); 
let location_msg = document.querySelector("#location");
let temperature = document.querySelector("#temperature");
let weatherText = document.querySelector("#weather");
let humidityText = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let weatherIcon = document.querySelector(".icon");

map.on('click', async function (e) {
  let { lat, lng } = e.latlng;

  let url = `https://api.weatherapi.com/v1/current.json?key=9025db8dbabb430d952165219252901&q=${lat},${lng}`;

  try {
    // Fetch the weather data
    let response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    let location = await response.json();

    // Extract weather details
    let place = location.location.name;
    let country = location.location.country;
    let temp_c = location.current.temp_c;
    let weatherCondition = location.current.condition.text;
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

    // Remove the loading message
    if (loadMsg) {
      loadMsg.remove();
    }

    // Display the weather details
    location_msg.textContent = `${place}, ${country}`;
    temperature.textContent = `${temp_c}°C`;
    weatherText.textContent = `${weatherCondition}`;
    humidityText.textContent = `${humidity}%`;
    windSpeed.textContent = `${wind} km/h`;
    weatherIcon.src = icon_url;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

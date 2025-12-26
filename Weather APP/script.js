
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const themeToggle = document.getElementById("themeToggle");

const API_KEY = "a1f59cc6805302204b62a7f3c57c7447";


searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") getWeather();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Toggle dark mode for all cards and forecast cards
  document.querySelectorAll('.card, .forecast-card').forEach(el => {
    el.classList.toggle('dark', document.body.classList.contains('dark'));
  });
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    error.textContent = "Please enter a city name.";
    return;
  }
  loading.style.display = "block";
  error.textContent = "";
  result.innerHTML = "";
  document.getElementById("forecast").innerHTML = "";
  document.getElementById("forecastTitle").style.display = "none";
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
    // Fetch 5-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!forecastRes.ok) throw new Error("Could not fetch forecast");
    const forecastData = await forecastRes.json();
    document.getElementById("forecastTitle").style.display = "block";
    displayForecast(forecastData);
  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.style.display = "none";
  }
}

function displayWeather(data) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
  `;
  result.innerHTML = "";
  result.appendChild(card);
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";
  
  // Get data for every day at noon (filter for 12:00:00)
  const dailyForecasts = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Keep the forecast closest to noon
    if (!dailyForecasts[day] || 
        Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyForecasts[day].dt * 1000).getHours() - 12)) {
      dailyForecasts[day] = item;
    }
  });
  
  // Display up to 5 days
  Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";
    forecastCard.innerHTML = `
      <p><strong>${dayName}</strong></p>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].main}">
      <p>${forecast.weather[0].main}</p>
      <p>High: ${forecast.main.temp_max}°C</p>
      <p>Low: ${forecast.main.temp_min}°C</p>
      <p>💨 ${forecast.wind.speed} m/s</p>
    `;
    forecastContainer.appendChild(forecastCard);
  });
}

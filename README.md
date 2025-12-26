# Weather App API

A simple frontend web application that allows users to search for current weather information by city name. The app fetches real-time weather data from the OpenWeatherMap API and displays it in a user-friendly interface with light/dark mode support.

## Project Description
- Enter a city name to get the current weather, temperature, humidity, and wind speed.
- Responsive and clean UI with a dark mode toggle.
- Error handling for invalid city names or network issues.

## API Details
- **API Used:** [OpenWeatherMap Current Weather Data](https://openweathermap.org/current)
- **Endpoint Example:**
  ```
  https://api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={API_KEY}
  ```
- **API Key:** You must use your own API key from OpenWeatherMap. The key is stored in `config.js` as `API_KEY`.

## Instructions to Run the Project
1. **Clone or Download the Project**
   - Place all files (`index.html`, `style.css`, `script.js`, `config.js`) in the same directory.
2. **Get an OpenWeatherMap API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) and generate a free API key.
   - Open `config.js` and replace the value of `API_KEY` with your key:
     ```js
     const API_KEY = "YOUR_API_KEY_HERE";
     ```
3. **Run the App**
   - Open `index.html` in your web browser.
   - Enter a city name and click "Search" to view the weather information.
   - Use the moon button to toggle dark mode.

## Credits
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/).

---

import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "afe3d0728bfce83a31d08fe7d608ef98";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);

    setError(null);

    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);

    } catch (err) {
      setError("City not found or API error.");
      setWeather(null);

    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          onKeyPress={(e) => e.key==="Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
</div>

  {loading && <p>Loading...</p>}
  {error && <p className="error">{error}</p>}

    {weather && (
        <div className="weather-card">
          <h3>{weather.name}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      )}

</div>
  );
};

export default WeatherApp;

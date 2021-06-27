import React, { useState } from "react";
import { fetchWeather } from "./api";

import "./App.css";

const imgBaseURL = "https://openweathermap.org/img/wn";

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [temperature, setTemp] = useState("");
  const [metricUnit, setMetricUnit] = useState(true);

  const search = async (e) => {
    if (e.key === "Enter" && query) {
      // alert(`${e.key} is pressed for the query: ${query}`);
      const data = await fetchWeather(query);
      setWeather(data);
      setTemp(Math.round(data?.main?.temp));
      setQuery("");
    }
  };

  const handleTempUnit = () => {
    let newTemp = 0;
    if (metricUnit) {
      newTemp = Number(temperature) * (9 / 5) + 32;
      setTemp(newTemp);
      setMetricUnit(false);
    } else {
      newTemp = (Number(temperature) - 32) * (5 / 9);
      setTemp(newTemp);
      setMetricUnit(true);
    }
  };

  console.log(weather, query);

  return (
    <>
      <div className="main-container">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={search}
        />
        {weather.main && (
          <>
            <div className="city">
              <h2 className="city-name">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
              </h2>
              <div
                title={`Change to ${metricUnit ? "Fahrenheit" : "Celcius"} `}
                onClick={handleTempUnit}
                className="city-temp"
              >
                <span>{temperature}</span>
                <sup>&deg; {metricUnit ? "C" : "F"}</sup>
              </div>
              <div className="info">
                <img
                  className="city-icon"
                  alt={`${weather.weather[0].main} Icon`}
                  src={`${imgBaseURL}/${weather.weather[0].icon}@2x.png`}
                />
                <p>{weather.weather[0].main}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

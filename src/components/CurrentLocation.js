import React, { useState, useEffect } from "react";
import Data from "./Data";
import "../styles/Data.css"
const API_KEY = "d078f5db93b9e170f3369d14f45bc62a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function CurrentLocation() {
  const [loccity, setLoccity] = useState('');
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const getCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      if (!response.ok) throw new Error('Error fetching city name');
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village;
      setLoccity(city);
    } catch (error) {
      setError('Error fetching city name. Please try again later.');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude);
        },
        () => setError('Please ensure location services are enabled.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const FetchWeather = async () => {
    try {
      if (loccity) {
        const response = await fetch(
          `${API_URL}?q=${loccity}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === "404" || loccity === "") {
          setError1("No Data Found");
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError1(null);
        }
      }
    } catch (error) {
      console.log("Error Fetching Weather Data ", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (loccity) FetchWeather();
  }, [loccity]);

  return (
    <div className="main">
      {/* <style>
        {`
          .mainloading{
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style> */}

      {weatherData ? (
        <Data city={weatherData} />
      ) : (
        <div className="mainloading">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default CurrentLocation;

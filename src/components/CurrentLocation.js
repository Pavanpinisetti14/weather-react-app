import React, { useState, useEffect } from "react";
import Data from "./Data";

const API_KEY = "d078f5db93b9e170f3369d14f45bc62a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function CurrentLocation() {
  const [loccity, setLoccity] = useState('');
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [show, setShow] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const getCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6c7242f5d9ec4ed5ab772a4cfebbeecc`);
      if (!response.ok) {
        throw new Error('Error fetching city name');
      }
      const data = await response.json();
      console.log("OpenCage API response:", data);
      const city = data.results[0]?.components.city || data.results[0]?.components.town || data.results[0]?.components.village;
      setLoccity(city);
    } catch (error) {
      setError('Error fetching city name. Please try again later.');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getCityName(latitude, longitude);
      }, (error) => {
        setError('Please ensure location services are enabled.');
      });
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const FetchWeather = async () => {
    try {
      if (loccity) { // Ensure loccity (area) is not empty
        const response = await fetch(
          `${API_URL}?q=${loccity}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        console.log(data);
        if (data.cod === "404" || loccity === "") {
          setError1("No Data Found");
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError1(null);
          setShow(true);
        }
      }
    } catch (error) {
      console.log("Error Fetching Weather Data ", error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    FetchWeather();
  }, [loccity]); // Add loccity as a dependency for useEffect

  return (
    <div>
      {weatherData && <Data city={weatherData} />}
    </div>
  );
}

export default CurrentLocation;

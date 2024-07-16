import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Data from './Data';

const API_KEY = "d078f5db93b9e170f3369d14f45bc62a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function SearchLocation() {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [show, setShow] = useState(false);
    const [redirectToRoot, setRedirectToRoot] = useState(false);

    const location = useLocation();
    let area = location.state.Loc;
    console.log(area);

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `${API_URL}?q=${area}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
        
            console.log(data);
            if (data.cod === "404" || area === "") {
                setError(false);
                setWeatherData(null);
                setRedirectToRoot(true); // Set state to redirect
            } else {
                setWeatherData(data);
                setError(true);
                setShow(true);
            }
        } catch (error) {
            console.log("Error Fetching Weather Data ", error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    console.log(error);
    console.log(weatherData);

    if (redirectToRoot) {
        return <Navigate to="/" />; // Redirect to root if needed
    }

    return (
        <div>
            {show ? (
                <Data city={weatherData} />
            ) : (
                <div>
                    <p>There was an error fetching weather data.</p>
                    {/* You can customize this alert message as needed */}
                </div>
            )}
        </div>
    );
}

export default SearchLocation;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Data from './Data';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect

const API_KEY = "d078f5db93b9e170f3369d14f45bc62a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function SearchLocation() {
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [show, setShow] = useState(true);
    const [redirectToRoot, setRedirectToRoot] = useState(false);

    const location = useLocation();
    let area = location.state.Loc;
    console.log(area);

    const FetchWeather = async () => {
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
        FetchWeather();
    }, []);

    console.log(error);
    console.log(weatherData);

    if (redirectToRoot) {
        return ; // Use Navigate to redirect
    }

    return (
        <div>
            {error ? (
                <Data city={weatherData} />
            ) : (
                <div>
                    {alert("U Enter Worng City Name")}
                    <Navigate to="/" />
                    {/* You can customize this alert message as needed */}
                </div>
            )}
        </div>
    );
}

export default SearchLocation;

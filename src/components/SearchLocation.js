
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import Data from './Data';

const API_KEY = "d078f5db93b9e170f3369d14f45bc62a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function SearchLocation(){
    const[error,setError] = useState(null);
    const[show,setShow] = useState(true);
    const[weatherData,setWeatherData] = useState(null);
    // const[showsun,setShowsun] = useState(false);

    const location=useLocation();
    let area = location.state.Loc;
   
    const FetchWeather = async()=>{
        try{
            const response = await fetch(
                `${API_URL}?q=${area}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
        
            console.log(data);
            if(data.cod === "404" || area === ""){
                setError("No Data Found");
                setWeatherData(null);
            }
            else{
                setWeatherData(data);
                setError(null)
                setShow(true);
            }
        }
        catch(error){
            console.log("Error Fetching Weather Data ",error);
        }
    };

    useEffect(()=>{
        FetchWeather();
    },[]);

    return(
        <div>
            {weatherData && <Data city={weatherData}/>}
        </div>
    );
}
export default SearchLocation;
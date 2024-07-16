import "../styles/Data.css";

const Data = (props) => {
  const { city } = props;
  console.log("city ", city);
    return (
        <div>
            <center>
                <div className="Container">
                    <div className="SearchLocation-container">
                        <br></br>
                        {/* <h2>{area} Weather Details</h2> */}

                        <div className="searchlocation-content-container">
                        <div className="area-name">
                            <h3>{city.name} Weather Report</h3>
                        </div>
                        <div>
                            <img
                            src="https://ayushkul.github.io/react-weather-app/icons/perfect-day.svg"
                            width={"200px"}
                            height={"200px"}
                            />
                        </div>
                        <div className="sl-data-content">
                            <div className="temp-data data">
                                <span>
                                    Temperature <br></br>
                                    {city.main.temp} °C
                                </span>
                            </div>
                            <div className="humidity-data data">
                                <span>
                                    Humidity <br></br>
                                    {city.main.humidity}
                                </span>
                            </div>
                            <div className="sun-data data">
                                <span>
                                    Wind Speed <br></br>{city.wind.speed}
                                </span>
                            </div>
                            <div className="weather-data data">
                                <span>
                                    Climate<br></br>
                                    {city.weather[0].main}
                                </span>
                            </div>
                        </div>
                        <div className="viewmore-btn">
                            <button id="viewmore-btn">View More</button>
                        </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};
export default Data;

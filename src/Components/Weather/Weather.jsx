import React, { useState } from "react";
import "./Weather.module.css";

const WeatherCard = ({ title, data }) => {
    return (
        <div className="weather-card">
            <h4 style={{ marginLeft: "25px", marginTop: "-15px" }}>{title}</h4>
            <p style={{ marginLeft: "40px", marginTop: "-15px" }}>{data}</p>
        </div>
    );
};

const Weather = () => {
    const [searchCity, setSearchCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);

    const fetchWeather = async () => {
        if (!searchCity) return;
        setIsLoading(true);
        setError(null);
        try {
            const apikey = "33c61b0820a04dff95b123707250601"; // Ensure this is a valid API key
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${searchCity}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch the weather data");
            }
            const result = await response.json();
            setWeatherData(result);
        } catch (error) {
            setError("Failed to fetch weather data"); // Set a user-friendly error message
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setSearchCity(e.target.value);
    };

    const handleSearch = () => {
        fetchWeather();
    };

    return (
        <>
            <div className="container">
                <input
                    style={{ width: "300px" }}
                    type="text"
                    placeholder="Enter City Name"
                    value={searchCity}
                    onChange={handleChange}
                />
                <button className="button" onClick={handleSearch}>Search</button>
            </div>
            {loading && <p style={{ position: "relative", left: "700px" }}>Loading data...</p>}
            {error && <p style={{ color: 'red', position: "relative", left: "700px" }}>{error}</p>}
            
            {weatherData && (
                <div className="weather-cards">
                    <WeatherCard
                        title={"Temperature"}
                        data={`${weatherData.current.temp_c} °C`}
                    />
                    <WeatherCard
                        title={"Humidity"}
                        data={`${weatherData.current.humidity}%`}
                    />
                    <WeatherCard
                        title={"Condition"}
                        data={`${weatherData.current.condition.text}`}
                    />
                    <WeatherCard
                        title={"Wind Speed"}
                        data={`${weatherData.current.wind_kph} kph`}
                    />
                </div>
            )}
        </>
    );
};

export default Weather;
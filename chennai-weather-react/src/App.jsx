import { useEffect, useState } from "react";
import "./App.css";
function App() {

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState("");

    async function getWeather() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=13.0827" +
                "&longitude=80.2707" +
                "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
            );

            if (!response.ok) {
                throw new Error("Unable to get weather data");
            }

            const data = await response.json();

            setWeather(data.current);
            setLastUpdated(new Date().toLocaleTimeString());

        } catch (error) {

            setError("Unable to load weather");

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        getWeather();
    }, []);

    function getWeatherCondition(code) {

        if (code === 0) {
            return "Clear sky";
        }

        if (code >= 1 && code <= 3) {
            return "Partly cloudy";
        }

        if (code >= 51 && code <= 67) {
            return "Rainy";
        }

        if (code >= 71 && code <= 77) {
            return "Snowy";
        }

        if (code >= 80 && code <= 82) {
            return "Rain showers";
        }

        if (code >= 95) {
            return "Thunderstorm";
        }

        return "Cloudy";
    }

    function getWeatherIcon(code) {
        if (code === 0) return "☀️";
        if (code >= 1 && code <= 3) return "⛅";
        if (code >= 51 && code <= 67) return "🌧️";
        if (code >= 71 && code <= 77) return "❄️";
        if (code >= 80 && code <= 82) return "🌦️";
        if (code >= 95) return "⛈️";
        return "☁️";
    }

    return (
        <div className="weather-container">

            <h1>Chennai Weather</h1>

            <p className="location">
                Chennai, Tamil Nadu
            </p>

            <div className="weather-card">

                {loading && !weather ? (
                    <p>Loading weather...</p>
                ) : weather ? (
                    <>
                        <div className="weather-icon">
                            {getWeatherIcon(weather.weather_code)}
                        </div>

                        <div className="temperature">
                            {weather.temperature_2m.toFixed(1)}°C
                        </div>

                        <p className="condition">
                            {getWeatherCondition(weather.weather_code)}
                        </p>

                        <div className="weather-info">

                            <div>
                                <p>Humidity</p>
                                <h3>
                                    {weather.relative_humidity_2m}%
                                </h3>
                            </div>

                            <div>
                                <p>Wind Speed</p>
                                <h3>
                                    {weather.wind_speed_10m} km/h
                                </h3>
                            </div>

                        </div>
                    </>
                ) : (
                    <p>Weather data unavailable</p>
                )}

            </div>

            <button
                className="refresh-button"
                onClick={getWeather}
                disabled={loading}
            >
                {loading ? "Updating..." : "Refresh Weather"}
            </button>

            <p className="status">
                {error
                    ? error
                    : lastUpdated
                        ? `Last updated at ${lastUpdated}`
                        : "Loading weather..."}
            </p>

        </div>
    );
}

export default App;
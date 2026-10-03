const API_URL =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=13.0827" +
    "&longitude=80.2707" +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code";
async function getWeather() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to get weather data");
        }

        const data = await response.json();

        const weather = data.current;

        const condition = getWeatherCondition(weather.weather_code);

        document.getElementById("condition").textContent = condition;

        document.getElementById("temperature").textContent =
            weather.temperature_2m;

        document.getElementById("humidity").textContent =
            weather.relative_humidity_2m;

        document.getElementById("wind").textContent =
            weather.wind_speed_10m;

        document.getElementById("status").textContent =
            "Weather updated successfully";

    } catch (error) {

        document.getElementById("status").textContent =
            "Unable to load weather";

        console.log(error);

    }
}
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
getWeather();
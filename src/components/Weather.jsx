import { getWeatherName } from "../lib/getWeatherName";
import { useState, useEffect } from "react";
import sunnyIcon from "../images/sunny.png";
import partlyIcon from "../images/partly cloudy.png";
import cloudyIcon from "../images/cloudy.png";
import rainIcon from "../images/rain.png";
import snowIcon from "../images/snow.png";
import stormIcon from "../images/storm.png";

const mapIcon = {
    sunny: sunnyIcon,
    partly: partlyIcon,
    rain: rainIcon,
    cloudy: cloudyIcon,
    snow: snowIcon,
    storm: stormIcon,
};

export default function Weather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
              );
              const data = await res.json();
              setWeather(data.current_weather);
        });
    }, []);

    if (!weather) return <div>Loading weather...</div>;

    return (
        <div className="weather" style ={{
            position: "relative"
        }}> 
            <img src={mapIcon[getWeatherName(weather.weathercode)]} />
            <div>{weather.temperature}°C</div>
        </div>
    );
}

import { useState, useEffect } from "react";
import sunnyIcon from "../images/sunny.png";
import partlyIcon from "../images/partly-cloudy.png";
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

export default function WeatherPicture() {
    const [weather, setWeather] = useState(null);
    
    function getWeatherName(code) {
        if (code === 0 || code === 1) return "sunny";
        if (code === 2) return "partly";
        if (code === 3) return "cloudy";
    
        if (
            (code >= 51 && code <= 57) ||
            (code >= 61 && code <= 67) ||
            (code >= 80 && code <= 82)
        ) return "rain";
    
        if (
            (code >= 71 && code <= 77) ||
            (code >= 85 && code <= 86)
        ) return "snow";
    
        if (code >= 95 && code <= 99) return "storm";
    
        return null;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
              );
              const data = await res.json();
              setWeather(data.current_weather);
              console.log("weather:", data.current_weather);
        });
    }, []);

    if (!weather) return <div>Loading weather...</div>;

    return (
        <div className="weather" style={{width: "auto"}}> 
            <img src={mapIcon[getWeatherName(weather.weathercode)]} width="15px" height="15px" />
            
        </div>
    );
}

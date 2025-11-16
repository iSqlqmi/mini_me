import { useEffect, useState } from "react";
import sunny from "../images/sunny.png";
import partly from "../images/partly cloudy.png";
import cloudy from "../images/cloudy.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import storm from "../images/storm.png";

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [img, setImg] = useState(null);

    function getWeatherName(code) {
      if (code === 0 || code === 1) return sunny;
      if (code === 2) return partly;
      if (code === 3) return cloudy;
  
      if (
        (code >= 51 && code <= 57) ||
        (code >= 61 && code <= 67) ||
        (code >= 80 && code <= 82)
      ) return rain;
  
      if (
        (code >= 71 && code <= 77) ||
        (code >= 85 && code <= 86)
      ) return snow;
  
      if (code >= 95 && code <= 99) return storm;
  
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
              
            console.log("API RESPONSE:", data);
            console.log("API KEY:", import.meta.env.VITE_WEATHER_KEY);
        });
    }, []);

    if (!weather) return <div>Loading weather...</div>;

    return (
        <div className="weather">
            <img src={getWeatherName(weather.weathercode)} />
            <div>{weather.temperature}°C</div>
        </div>
    );
}

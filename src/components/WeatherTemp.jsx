import { useState, useEffect } from "react";

export default function WeatherTemp() {
    
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
        <div className="weather">
            <div>{weather.temperature}°C</div>
        </div>
    );
}

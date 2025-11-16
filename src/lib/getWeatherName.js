export function getWeatherName(code) {
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

    return "cloudy";
}
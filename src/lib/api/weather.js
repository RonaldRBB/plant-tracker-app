const WEATHER_BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

export const fetchWeather = async () => {
    try {
        // Coordenadas configuradas en variables de entorno
        const lat = process.env.NEXT_PUBLIC_WEATHER_LAT;
        const lon = process.env.NEXT_PUBLIC_WEATHER_LON;
        const forecastDays = process.env.NEXT_PUBLIC_WEATHER_FORECAST_DAYS;
        
        const response = await fetch(`${WEATHER_BASE_URL}/forecast?forecast_days=${forecastDays}&latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_max,weather_code&timezone=America/Argentina/Buenos_Aires`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error.message);
        throw error;
    }
}; 
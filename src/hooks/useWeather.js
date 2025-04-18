import { useState, useEffect } from 'react';
import { fetchWeather } from '@/lib/api/weather';

const CACHE_KEY = 'weather_cache';
const CACHE_DURATION = parseInt(process.env.NEXT_PUBLIC_WEATHER_CACHE_DURATION) || 600000; // 10 minutos por defecto

export const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadWeather = async (force = false) => {
        try {
            // Intentar obtener datos del caché
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData && !force) {
                const { data, timestamp } = JSON.parse(cachedData);
                const now = Date.now();
                
                // Si el caché es válido (menos de 10 minutos), usarlo
                if (now - timestamp < CACHE_DURATION) {
                    setWeather(data);
                    setError(null);
                    setLoading(false);
                    return;
                }
            }

            // Si no hay caché o está expirado, hacer la petición
            const data = await fetchWeather();
            
            // Guardar en caché con timestamp
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data,
                timestamp: Date.now()
            }));

            setWeather(data);
            setError(null);
        } catch (error) {
            console.error('Error loading weather:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWeather();
        // Actualizar el clima cada 10 minutos
        const timer = setInterval(() => loadWeather(true), CACHE_DURATION);
        return () => clearInterval(timer);
    }, []);

    // Función de utilidad para obtener el índice del día actual y próximos días
    const getForecastIndices = () => {
        if (!weather) return { todayIndex: -1, startIndex: -1 };
        const today = new Date().toISOString().split('T')[0];
        const todayIndex = weather.daily.time.findIndex(date => date === today);
        const startIndex = todayIndex + 1;  // Comenzar desde el día siguiente
        return { todayIndex, startIndex };
    };

    return {
        weather,
        error,
        loading,
        getForecastIndices
    };
}; 
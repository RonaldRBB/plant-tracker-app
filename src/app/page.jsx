'use client';

import { useWeather } from '@/hooks/useWeather';
import WeatherCharts from '@/components/WeatherCharts';
import CurrentWeather from '@/components/CurrentWeather';
import WeeklyForecast from '@/components/WeeklyForecast';
import { FormattedMessage } from 'react-intl';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect } from 'react';

export default function Home() {
    const { weather, loading, error, getForecastIndices } = useWeather();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 500); // Esperar a que termine la animación de fade out
            return () => clearTimeout(timer);
        }
    }, [loading]);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="notification is-danger"><FormattedMessage id="message.error" defaultMessage="Error" />: {error}</div>;
    if (!weather) return null;

    const { startIndex } = getForecastIndices();
    const daysToShow = parseInt(process.env.NEXT_PUBLIC_WEATHER_DISPLAY_DAYS);

    return (
        <div className={`container is-fluid p-4 ${showContent ? 'fade-in' : ''}`} style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
        }}>
            <h1 className="title has-text-centered mb-6">
                <FormattedMessage id="weather.title" defaultMessage="Clima" />
            </h1>
            
            <CurrentWeather weather={weather} />

            <WeeklyForecast 
                weather={weather}
                startIndex={startIndex}
                daysToShow={daysToShow}
            />

            <WeatherCharts weatherData={weather} />
        </div>
    );
}
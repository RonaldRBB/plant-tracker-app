import { getWeatherDescription } from '@/lib/utils/weather';
import { FormattedMessage, useIntl } from 'react-intl';

export default function CurrentWeather({ weather }) {
    const intl = useIntl();
    const currentDateTime = new Date(weather.current.time);
    const hour = currentDateTime.getHours();
    const isNighttime = hour >= parseInt(process.env.NEXT_PUBLIC_NIGHT_START_HOUR) || 
                       hour < parseInt(process.env.NEXT_PUBLIC_NIGHT_END_HOUR);

    const getRainIcon = (probability) => {
        const highThreshold = parseInt(process.env.NEXT_PUBLIC_WEATHER_RAIN_HIGH_THRESHOLD);
        const lowThreshold = parseInt(process.env.NEXT_PUBLIC_WEATHER_RAIN_LOW_THRESHOLD);
        return probability > highThreshold ? '🌧️' : 
               probability > lowThreshold ? '🌦️' : '☀️';
    };

    const weatherInfo = getWeatherDescription(weather.current.weather_code, isNighttime);

    return (
        <div className="boxNew">
            <p className="has-text-centered mb-4">
                {currentDateTime.toLocaleDateString(intl.locale, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">
                            <FormattedMessage id="weather.temperature" defaultMessage="Temperatura" />
                        </p>
                        <p className="title">{Math.round(weather.current.temperature_2m)}°C</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">
                            <FormattedMessage id="weather.humidity" defaultMessage="Humedad" />
                        </p>
                        <p className="title">{weather.current.relative_humidity_2m}%</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">
                            <FormattedMessage id="weather.conditions" defaultMessage="Condiciones" />
                        </p>
                        <p className="title is-5">
                            <span role="img" aria-label="condiciones">
                                {weatherInfo.icon}
                            </span>
                            {' '}
                            <FormattedMessage id={weatherInfo.textKey} />
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">
                            <FormattedMessage id="weather.rainProbability" defaultMessage="Prob. Lluvia" />
                        </p>
                        <p className="title">
                            {getRainIcon(weather.daily.precipitation_probability_max[0])} 
                            {weather.daily.precipitation_probability_max[0]}%
                        </p>
                    </div>
                </div>
            </nav>
        </div>
    );
} 
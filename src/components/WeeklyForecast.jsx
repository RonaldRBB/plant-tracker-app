import { getWeatherDescription } from '@/lib/utils/weather';
import { FormattedMessage, useIntl } from 'react-intl';
function getHumidityClass(humidity) {
    if (humidity < 40) {
        return 'has-text-danger';
    } else if (humidity <= 60) {
        return 'has-text-warning';
    } else if (humidity <= 80) {
        return 'has-text-success';
    } else {
        return 'has-text-link';
    }
}
export default function WeeklyForecast({ weather, startIndex, daysToShow }) {
    const intl = useIntl();
    return (
        <div className="boxNew mt-5">
            <h2 className="title is-4 has-text-centered mb-5">
                <FormattedMessage id="weather.forecast.weekly" defaultMessage="Pronóstico Semanal" />
            </h2>
            <div className="columns is-mobile is-multiline">
                {weather.daily.time.slice(startIndex, startIndex + daysToShow).map((date, index) => {
                    const dateObj = new Date(date);
                    const weatherInfo = getWeatherDescription(
                        weather.daily.weather_code[startIndex + index],
                        false
                    );
                    const rainProb = weather.daily.precipitation_probability_max[startIndex + index];

                    return (
                        <div key={date} className="column is-one-seventh">
                            <div className="has-text-centered boxNew">
                                <p className="is-uppercase has-text-weight-bold mb-3">
                                    {dateObj.toLocaleDateString(intl.locale, {
                                        weekday: 'short'
                                    }).toUpperCase()}
                                </p>
                                <p className="has-text-grey mb-4">
                                    {dateObj.toLocaleDateString(intl.locale, {
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="title is-4 mb-4" title={intl.formatMessage({ id: weatherInfo.textKey })}>
                                    {weatherInfo.icon}
                                </p>
                                <div className="mb-4">
                                    <p className="title is-5 mb-2">
                                        {Math.round(weather.daily.temperature_2m_max[startIndex + index])}°C
                                    </p>
                                    <p className="subtitle is-6 has-text-grey">
                                        {Math.round(weather.daily.temperature_2m_min[startIndex + index])}°C
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <p className="heading mb-2">
                                        <FormattedMessage id="weather.humidity" defaultMessage="Humedad" />
                                    </p>
                                    <p className={`is-size-6 ${getHumidityClass(weather.daily.relative_humidity_2m_max[startIndex + index])}`}>
                                        {weather.daily.relative_humidity_2m_max[startIndex + index]}%
                                    </p>
                                </div>
                                <div>
                                    <p className="heading mb-2">
                                        <FormattedMessage id="weather.rainProbability" defaultMessage="Lluvia" />
                                    </p>
                                    <p className="is-size-6">
                                        {rainProb > 50 ? '🌧️' : rainProb > 20 ? '🌦️' : '☀️'}{' '}
                                        <span className="has-text-weight-semibold">{rainProb}%</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 
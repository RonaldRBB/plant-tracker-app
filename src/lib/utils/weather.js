export const getWeatherDescription = (code, isNight = false) => {
    const weatherCodes = {
        0: { 
            textKey: 'weather.condition.clear', 
            icon: isNight ? '🌙' : '☀️'
        },
        1: { 
            textKey: 'weather.condition.mostlyClear', 
            icon: isNight ? '🌙' : '🌤️'
        },
        2: { 
            textKey: 'weather.condition.partlyCloudy', 
            icon: isNight ? '☁️' : '⛅'
        },
        3: { textKey: 'weather.condition.cloudy', icon: '☁️' },
        45: { textKey: 'weather.condition.fog', icon: '🌫️' },
        48: { textKey: 'weather.condition.heavyFog', icon: '🌫️' },
        51: { textKey: 'weather.condition.lightDrizzle', icon: '🌦️' },
        53: { textKey: 'weather.condition.moderateDrizzle', icon: '🌧️' },
        55: { textKey: 'weather.condition.heavyDrizzle', icon: '🌧️' },
        61: { textKey: 'weather.condition.lightRain', icon: '🌧️' },
        63: { textKey: 'weather.condition.moderateRain', icon: '🌧️' },
        65: { textKey: 'weather.condition.heavyRain', icon: '⛈️' },
        80: { textKey: 'weather.condition.lightRain', icon: '🌧️' },
        81: { textKey: 'weather.condition.moderateRain', icon: '🌧️' },
        82: { textKey: 'weather.condition.heavyRain', icon: '⛈️' },
        95: { textKey: 'weather.condition.thunderstorm', icon: '⛈️' },
        96: { textKey: 'weather.condition.thunderstormHail', icon: '🌩️' }
    };
    return weatherCodes[code] || { textKey: 'weather.condition.unknown', icon: '❓' };
}; 
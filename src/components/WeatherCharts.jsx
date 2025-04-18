'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function WeatherCharts({ weatherData }) {
    const intl = useIntl();
    const [activeDatasets, setActiveDatasets] = useState({
        temperature: true,
        humidity: true,
        rain: true
    });

    // Obtener el índice del día actual
    const today = new Date().toISOString().split('T')[0];
    const todayIndex = weatherData.daily.time.findIndex(date => date === today);
    const startIndex = todayIndex + 1;  // Comenzar desde mañana
    const daysToShow = parseInt(process.env.NEXT_PUBLIC_WEATHER_DISPLAY_DAYS);

    // Asegurarnos de obtener exactamente los días configurados
    const dates = weatherData.daily.time
        .slice(startIndex, startIndex + daysToShow)
        .map(date => new Date(date).toLocaleDateString(intl.locale, {
            weekday: 'short',
            day: 'numeric'
        }));

    // Datos combinados para el gráfico principal
    const combinedData = {
        labels: dates,
        datasets: [
            {
                label: intl.formatMessage({ id: 'weather.temperature', defaultMessage: 'Temperatura Máx.' }),
                data: weatherData.daily.temperature_2m_max.slice(startIndex, startIndex + daysToShow),
                borderColor: '#FF6B6B',
                backgroundColor: '#FF6B6B',
                yAxisID: 'temperature',
                hidden: !activeDatasets.temperature,
                fill: false,
                tension: 0,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 4,
            },
            {
                label: intl.formatMessage({ id: 'weather.temperature.min', defaultMessage: 'Temperatura Mín.' }),
                data: weatherData.daily.temperature_2m_min.slice(startIndex, startIndex + daysToShow),
                borderColor: '#4ECDC4',
                backgroundColor: '#4ECDC4',
                yAxisID: 'temperature',
                hidden: !activeDatasets.temperature,
                fill: false,
                tension: 0,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 4,
            },
            {
                label: intl.formatMessage({ id: 'weather.humidity', defaultMessage: 'Humedad' }),
                data: weatherData.daily.relative_humidity_2m_max.slice(startIndex, startIndex + daysToShow),
                borderColor: '#45B7D1',
                backgroundColor: 'rgba(69, 183, 209, 0.2)',
                yAxisID: 'percentage',
                hidden: !activeDatasets.humidity,
                fill: 'start',
                tension: 0,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 4,
            },
            {
                label: intl.formatMessage({ id: 'weather.rainProbability', defaultMessage: 'Prob. Lluvia' }),
                type: 'bar',
                data: weatherData.daily.precipitation_probability_max.slice(startIndex, startIndex + daysToShow),
                backgroundColor: 'rgba(95, 150, 255, 0.8)',
                borderColor: 'rgba(95, 150, 255, 1)',
                yAxisID: 'percentage',
                hidden: !activeDatasets.rain,
                borderWidth: 1,
                borderRadius: 0,
            }
        ]
    };

    const combinedOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12 },
                    boxWidth: 30,
                },
                onClick: (e, legendItem, legend) => {
                    const datasetType = legendItem.text.toLowerCase().includes('temp') ? 'temperature' :
                                      legendItem.text.toLowerCase().includes('hum') ? 'humidity' : 'rain';
                    setActiveDatasets(prev => ({
                        ...prev,
                        [datasetType]: !prev[datasetType]
                    }));
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#000',
                bodyColor: '#000',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (label.includes(intl.formatMessage({ id: 'weather.temperature', defaultMessage: 'Temperatura' }))) {
                            label += context.parsed.y + '°C';
                        } else {
                            label += context.parsed.y + '%';
                        }
                        return label;
                    }
                }
            },
            title: {
                display: true,
                text: intl.formatMessage({ id: 'weather.chart.title', defaultMessage: 'Pronóstico Climático Integrado' }),
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: 20
            }
        },
        scales: {
            temperature: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: intl.formatMessage({ id: 'weather.chart.temperature', defaultMessage: 'Temperatura (°C)' }),
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    callback: value => `${value}°C`
                }
            },
            percentage: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: intl.formatMessage({ id: 'weather.chart.percentage', defaultMessage: 'Porcentaje (%)' }),
                },
                min: 0,
                max: 100,
                grid: {
                    display: false,
                },
                ticks: {
                    callback: value => `${value}%`
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    padding: 10,
                    font: { size: 11 }
                }
            }
        }
    };

    // Controles para filtrar datos
    const DatasetControls = () => (
        <div className="buttons has-addons is-centered mb-4">
            <button 
                className={`button ${activeDatasets.temperature ? 'is-info is-selected' : ''}`}
                onClick={() => setActiveDatasets(prev => ({ ...prev, temperature: !prev.temperature }))}>
                <FormattedMessage id="weather.temperature" defaultMessage="Temperatura" />
            </button>
            <button 
                className={`button ${activeDatasets.humidity ? 'is-info is-selected' : ''}`}
                onClick={() => setActiveDatasets(prev => ({ ...prev, humidity: !prev.humidity }))}>
                <FormattedMessage id="weather.humidity" defaultMessage="Humedad" />
            </button>
            <button 
                className={`button ${activeDatasets.rain ? 'is-info is-selected' : ''}`}
                onClick={() => setActiveDatasets(prev => ({ ...prev, rain: !prev.rain }))}>
                <FormattedMessage id="weather.rainProbability" defaultMessage="Lluvia" />
            </button>
        </div>
    );

    return (
        <div className="boxNew">
            <h2 className="title is-4 has-text-centered mb-4">
                <FormattedMessage id="weather.chart.title" defaultMessage="Análisis del Clima" />
            </h2>
            <DatasetControls />
            <div style={{ height: '400px' }}>
                <Line options={combinedOptions} data={combinedData} />
            </div>
        </div>
    );
} 
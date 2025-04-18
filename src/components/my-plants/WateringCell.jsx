import React from 'react';
import { getStandardizedDate } from './utils/calendar-helpers';
import { WATERING_COLORS, WATERING_ICONS } from './constants/watering-styles';
import { FormattedMessage, useIntl } from 'react-intl';

const WateringCell = ({
    dayNumber,
    selectedDate,
    isWateringDay,
    withFertilizer,
    withSlowRelease,
    withTrichoderma,
    nextWateringDate,
    currentDay
}) => {
    const intl = useIntl();
    const currentCalendarDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        dayNumber
    );

    const standardizedNextWateringDate = nextWateringDate ? getStandardizedDate(nextWateringDate.date) : null;

    const isNextWateringDay = standardizedNextWateringDate && 
        standardizedNextWateringDate.getDate() === currentCalendarDate.getDate() &&
        standardizedNextWateringDate.getMonth() === currentCalendarDate.getMonth() &&
        standardizedNextWateringDate.getFullYear() === currentCalendarDate.getFullYear();

    const standardizedDate = getStandardizedDate();
    const isToday = dayNumber === currentDay &&
        selectedDate.getMonth() === standardizedDate.getMonth() &&
        selectedDate.getFullYear() === standardizedDate.getFullYear();

    const getWateringStyle = () => {
        if (!isWateringDay && !isNextWateringDay) return null;

        const icon = isNextWateringDay ? WATERING_ICONS.NEXT : WATERING_ICONS.PAST;
        let color;
        let tooltipId = '';
        
        if (isNextWateringDay) {
            // Estilos para próximos riegos
            if (nextWateringDate?.with_trichoderma) {
                color = WATERING_COLORS.NEXT.TRICHODERMA;
                tooltipId = 'watering.tooltip.nextWithTrichoderma';
            } else if (nextWateringDate?.with_fertilizer) {
                color = WATERING_COLORS.NEXT.FERTILIZER;
                tooltipId = 'watering.tooltip.nextWithFertilizer';
            } else if (nextWateringDate?.with_slow_release) {
                color = WATERING_COLORS.NEXT.SLOW_RELEASE;
                tooltipId = 'watering.tooltip.nextWithSlowRelease';
            } else {
                color = WATERING_COLORS.NEXT.NORMAL;
                tooltipId = 'watering.tooltip.nextNormal';
            }
        } else {
            // Estilos para riegos pasados
            if (withTrichoderma) {
                color = WATERING_COLORS.PAST.TRICHODERMA;
                tooltipId = 'watering.tooltip.pastWithTrichoderma';
            } else if (withFertilizer) {
                color = WATERING_COLORS.PAST.FERTILIZER;
                tooltipId = 'watering.tooltip.pastWithFertilizer';
            } else if (withSlowRelease) {
                color = WATERING_COLORS.PAST.SLOW_RELEASE;
                tooltipId = 'watering.tooltip.pastWithSlowRelease';
            } else {
                color = WATERING_COLORS.PAST.NORMAL;
                tooltipId = 'watering.tooltip.pastNormal';
            }
        }

        return { icon, color, tooltipId };
    };

    const wateringStyle = getWateringStyle();

    return (
        <td 
            className={`has-text-centered is-vcentered ${isToday ? 'has-background-grey-darker' : ''}`}
            style={{ height: '30px', width: '30px', minWidth: '30px' }}
        >
            {wateringStyle && (
                <span 
                    className="has-tooltip-arrow has-tooltip-top" 
                    data-tooltip={intl.formatMessage({ id: wateringStyle.tooltipId })}
                >
                    <span className={`icon ${wateringStyle.color}`}>
                        <i className={`fas ${wateringStyle.icon}`}></i>
                    </span>
                </span>
            )}
        </td>
    );
};

export default WateringCell;
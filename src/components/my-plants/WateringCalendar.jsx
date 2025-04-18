import React from 'react';
import WateringCell from './WateringCell';

const WateringCalendar = ({
    wateringDays,
    nextWateringDate,
    selectedDate,
    daysInMonth,
    currentDay
}) => {
    return (
        <>
            {[...Array(daysInMonth)].map((_, index) => {
                const dayNumber = index + 1;
                const isWateringDay = wateringDays.has(dayNumber);
                const wateringInfo = wateringDays.get(dayNumber) || {};
                
                return (
                    <WateringCell
                        key={dayNumber}
                        dayNumber={dayNumber}
                        selectedDate={selectedDate}
                        isWateringDay={isWateringDay}
                        withFertilizer={wateringInfo.withFertilizer}
                        withSlowRelease={wateringInfo.withSlowRelease}
                        withTrichoderma={wateringInfo.withTrichoderma}
                        nextWateringDate={nextWateringDate}
                        currentDay={currentDay}
                    />
                );
            })}
        </>
    );
};

export default WateringCalendar; 
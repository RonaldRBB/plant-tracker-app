import React from 'react';
import PlantInfo from './PlantInfo';
import WateringCalendar from './WateringCalendar';
import PlantActions from './PlantActions';
import { useWateringStatus } from './hooks/useWateringStatus';

const PlantTableRow = ({
    userPlant,
    selectedDate,
    daysInMonth,
    currentDay,
    isCurrentMonth,
    onEdit,
    onWater,
    onDelete
}) => {
    const { className: statusClassName } = useWateringStatus(userPlant, isCurrentMonth);
    const isTestPlant = userPlant.nickname?.toLowerCase() === 'test';

    // Crear un Map con los días de riego
    const wateringDays = new Map();
    
    if (userPlant.watering_logs) {
        // Procesar los días de riego para el mes actual
        userPlant.watering_logs.forEach(log => {
            const [year, month, day] = log.watering_date.split('-').map(Number);
            const logDate = new Date(year, month - 1, day);
            
            if (logDate.getMonth() === selectedDate.getMonth() &&
                logDate.getFullYear() === selectedDate.getFullYear()) {
                wateringDays.set(logDate.getDate(), {
                    withFertilizer: log.with_fertilizer,
                    withSlowRelease: log.with_slow_release,
                    withTrichoderma: log.with_trichoderma
                });
            }
        });
    }

    return (
        <tr className={`${statusClassName} ${isTestPlant ? 'has-background-link' : ''}`}>
            <PlantInfo
                plant={userPlant}
                location={userPlant.location}
                mycorrhiza={userPlant.mycorrhiza}
                averageInterval={userPlant.average_watering_interval}
            />
            <WateringCalendar
                wateringDays={wateringDays}
                nextWateringDate={userPlant.next_watering_date}
                selectedDate={selectedDate}
                daysInMonth={daysInMonth}
                currentDay={currentDay}
            />
            <td className="has-text-centered" style={{ padding: '0' }}>
                <PlantActions
                    onEdit={() => onEdit(userPlant)}
                    onWater={() => onWater(userPlant)}
                    onDelete={() => onDelete(userPlant.id)}
                />
            </td>
        </tr>
    );
};

export default PlantTableRow; 
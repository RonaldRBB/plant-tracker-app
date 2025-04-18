import { getStandardizedDate } from '../utils/calendar-helpers';

export const useWateringStatus = (plantData, isCurrentMonth) => {
    let className = '';
    
    // Si no estamos en el mes actual, no mostramos advertencias
    if (!isCurrentMonth) {
        return { className, plant: plantData };
    }
    
    const today = getStandardizedDate();

    // Verificar si hay una próxima fecha de riego
    if (plantData.next_watering_date) {
        const nextWateringDate = getStandardizedDate(plantData.next_watering_date.date);
        const diffTime = Math.abs(today - nextWateringDate);
        const daysUntilNextWatering = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Si la fecha de próximo riego ya pasó
        if (today > nextWateringDate) {
            // Si han pasado más días que el umbral de peligro
            if (daysUntilNextWatering > plantData.warningThreshold) {
                return { className: 'blink-danger' };
            }
            // Si es el día de riego o ha pasado la fecha
            return { className: 'blink-warning' };
        }
        // Si es exactamente el día de riego
        else if (nextWateringDate.getTime() === today.getTime()) {
            return { className: 'blink-warning' };
        }
    }
    
    // Solo aplicar las clases si hay registros de riego
    if (plantData.watering_logs && plantData.watering_logs.length > 0) {
        // Ordenar los registros por fecha, más reciente primero
        const sortedLogs = [...plantData.watering_logs].sort((a, b) => 
            getStandardizedDate(b.watering_date) - getStandardizedDate(a.watering_date)
        );
        
        const lastWateringDate = getStandardizedDate(sortedLogs[0].watering_date);
        const diffTime = Math.abs(today - lastWateringDate);
        const daysSinceLastWatering = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Asignar clase según los días transcurridos usando los umbrales del modelo
        if (daysSinceLastWatering > plantData.dangerThreshold) {
            className = 'blink-danger';
        } else if (daysSinceLastWatering > plantData.warningThreshold) {
            className = 'blink-warning';
        }
    }

    return {
        className,
        plant: plantData
    };
}; 
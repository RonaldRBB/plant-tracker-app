import { standardizeDate } from '@/lib/utils/dateUtils';

export const getDayOfWeekLetter = (dayNumber, selectedDate) => {
    const date = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), dayNumber));
    const days = [
        'calendar.day.sunday',
        'calendar.day.monday',
        'calendar.day.tuesday',
        'calendar.day.wednesday',
        'calendar.day.thursday',
        'calendar.day.friday',
        'calendar.day.saturday'
    ];
    return days[date.getUTCDay()];
};

export const getStandardizedDate = standardizeDate;

export const getDaysInSelectedMonth = (selectedDate) => {
    return new Date(Date.UTC(
        selectedDate.getUTCFullYear(),
        selectedDate.getUTCMonth() + 1,
        0
    )).getUTCDate();
};

export const getSelectedMonthWateringDays = (wateringLogs, selectedDate) => {
    const days = new Map();
    if (!wateringLogs) return days;
        wateringLogs.forEach(log => {
                const logDate = standardizeDate(log.watering_date);
                if (!isNaN(logDate.getTime())) {
            if (logDate.getUTCMonth() === selectedDate.getUTCMonth() &&
                logDate.getUTCFullYear() === selectedDate.getUTCFullYear()) {
                days.set(logDate.getUTCDate(), log.with_fertilizer);
            }
        } else {
            console.error("Fecha inválida:", log.watering_date);
        }
    });
        return days;
};

export const getDaysSinceLastWatering = (wateringLogs) => {
    if (!wateringLogs || wateringLogs.length === 0) {
        return Infinity;
    }

    try {
        const sortedLogs = [...wateringLogs].sort((a, b) =>
            standardizeDate(b.watering_date) - standardizeDate(a.watering_date)
        );

        const lastWateringDate = standardizeDate(sortedLogs[0].watering_date);
        const today = standardizeDate();

        if (isNaN(lastWateringDate.getTime())) {
            return Infinity;
        }

        const diffTime = Math.abs(today - lastWateringDate);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return days;
    } catch (error) {
        console.error('Error calculating days:', error);
        return Infinity;
    }
};

export const calculateNextWateringDate = (wateringLogs, averageInterval) => {
    if (!wateringLogs || wateringLogs.length === 0 || !averageInterval) {
        return null;
    }

    try {
        const sortedLogs = [...wateringLogs].sort((a, b) =>
            standardizeDate(b.watering_date) - standardizeDate(a.watering_date)
        );

        const lastWateringDate = standardizeDate(sortedLogs[0].watering_date);
        const nextDate = new Date(lastWateringDate);
        
        // Calculamos los días completos que deben pasar
        const daysToAdd = Math.round(averageInterval);
        nextDate.setUTCDate(nextDate.getUTCDate() + daysToAdd);
        
        return nextDate;
    } catch (error) {
        console.error('Error calculating next watering date:', error);
        return null;
    }
}; 
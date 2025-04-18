import { getStandardizedDate } from '@/components/my-plants/utils/calendar-helpers';

export class WateringService {
    static getDaysSinceLastWatering(plant) {
        const lastWateringDate = plant.getLastWateringDate();
        if (!lastWateringDate) {
            return Infinity;
        }

        try {
            const standardizedLastWatering = getStandardizedDate(lastWateringDate);
            const today = getStandardizedDate();

            if (isNaN(standardizedLastWatering.getTime())) {
                return Infinity;
            }

            const diffTime = Math.abs(today - standardizedLastWatering);
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return days - 1;
        } catch (error) {
            console.error('Error calculating days since last watering:', error);
            return Infinity;
        }
    }

    static calculateNextWateringDate(plant) {
        const lastWateringDate = plant.getLastWateringDate();
        if (!lastWateringDate || !plant.averageWateringInterval) {
            return null;
        }

        try {
            const nextDate = new Date(lastWateringDate);
            const daysToAdd = Math.round(plant.averageWateringInterval);
            nextDate.setDate(nextDate.getDate() + daysToAdd);
            return nextDate;
        } catch (error) {
            console.error('Error calculating next watering date:', error);
            return null;
        }
    }

    static getWateringStatus(plant) {
        const daysSinceLastWatering = this.getDaysSinceLastWatering(plant);
        
        if (daysSinceLastWatering === Infinity || isNaN(daysSinceLastWatering)) {
            return 'blink-danger';
        }
        if (daysSinceLastWatering > plant.dangerThreshold) {
            return 'blink-danger';
        }
        if (daysSinceLastWatering > plant.warningThreshold) {
            return 'blink-warning';
        }
        return '';
    }

    static getMonthWateringDays(plant, selectedDate) {
        const days = new Map();
        if (!plant.wateringLogs) return days;

        plant.wateringLogs.forEach(log => {
            const logDate = getStandardizedDate(log.watering_date);
            if (!isNaN(logDate.getTime())) {
                if (logDate.getMonth() === selectedDate.getMonth() &&
                    logDate.getFullYear() === selectedDate.getFullYear()) {
                    days.set(logDate.getDate(), log.with_fertilizer);
                }
            }
        });
        
        return days;
    }
} 
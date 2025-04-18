import { useState } from 'react';
import { getDaysInSelectedMonth } from '@/components/my-plants/utils/calendar-helpers';
import { getCurrentDay, getStandardizedToday, standardizeDate } from '@/lib/utils/dateUtils';
export const useCalendarNavigation = (userPlants) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        const initialDate = getStandardizedToday();
        return initialDate;
    });
    const getOldestWateringDate = () => {
        if (!userPlants || userPlants.length === 0) {
            return getStandardizedToday();
        }
        let oldestDate = null;
        userPlants.forEach(userPlant => {
            if (userPlant.watering_logs && userPlant.watering_logs.length > 0) {
                const dates = userPlant.watering_logs.map(log => standardizeDate(log.watering_date));
                const validDates = dates.filter(date => !isNaN(date.getTime()));
                if (validDates.length > 0) {
                    const plantOldestDate = new Date(Math.min(...validDates));
                    if (oldestDate === null || plantOldestDate < oldestDate) {
                        oldestDate = plantOldestDate;
                    }
                }
            }
        });
        return oldestDate || getStandardizedToday();
    };
    const navigateMonth = (direction) => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setUTCMonth(prevDate.getUTCMonth() + direction);
            newDate.setUTCDate(1);
            if (direction > 0) {
                const currentDate = getStandardizedToday();
                const futureLimit = new Date(currentDate);
                futureLimit.setUTCMonth(currentDate.getUTCMonth() + 1);
                if (newDate > futureLimit) {
                    return prevDate;
                }
            }
            if (direction < 0) {
                const oldestDate = getOldestWateringDate();
                if (newDate.getUTCFullYear() < oldestDate.getUTCFullYear() ||
                    (newDate.getUTCFullYear() === oldestDate.getUTCFullYear() &&
                        newDate.getUTCMonth() < oldestDate.getUTCMonth())) {
                    return prevDate;
                }
            }
            return newDate;
        });
    };
    return {
        selectedDate,
        daysInMonth: getDaysInSelectedMonth(selectedDate),
        currentDay: getCurrentDay(),
        navigateMonth,
        getOldestWateringDate
    };
}; 
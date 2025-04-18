export const getDaysInCurrentMonth = () => {
    const now = getStandardizedToday();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate();
};

export const getCurrentMonthWateringDays = (wateringLogs) => {
    if (!wateringLogs) return new Set();
    
    const now = getStandardizedToday();
    const currentMonth = now.getUTCMonth();
    const currentYear = now.getUTCFullYear();
    
    return new Set(
        wateringLogs
            .filter(log => {
                const logDate = standardizeDate(log.watering_date);
                return logDate.getUTCMonth() === currentMonth && 
                       logDate.getUTCFullYear() === currentYear;
            })
            .map(log => standardizeDate(log.watering_date).getUTCDate())
    );
};

export const getCurrentMonthYear = () => {
    const now = getStandardizedToday();
    return now.toLocaleString('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

export const getStandardizedToday = () => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0));
};

export const standardizeDate = (date) => {
    if (!date) return getStandardizedToday();
    
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = date.split('-').map(Number);
        return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    }
    
    const d = new Date(date);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0));
};

export const getCurrentDay = () => getStandardizedToday().getUTCDate();

export const getCurrentMonth = () => getStandardizedToday().getUTCMonth();

export const getCurrentYear = () => getStandardizedToday().getUTCFullYear();

export const isSameDay = (date1, date2) => {
    const d1 = standardizeDate(date1);
    const d2 = standardizeDate(date2);
    return d1.getTime() === d2.getTime();
}; 
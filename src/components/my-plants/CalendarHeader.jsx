import React from 'react';
import { getStandardizedDate } from './utils/calendar-helpers';
import { useIntl } from 'react-intl';

const CalendarHeader = ({ 
    selectedDate, 
    navigateMonth, 
    oldestWateringDate 
}) => {
    const intl = useIntl();
    const currentDate = getStandardizedDate();
    const futureLimit = new Date(currentDate);
    futureLimit.setMonth(currentDate.getMonth() + 1);

    return (
        <div className="is-flex is-justify-content-center is-align-items-center mb-3">
            <button
                className="button is-ghost"
                onClick={() => navigateMonth(-1)}
                disabled={
                    selectedDate.getFullYear() === oldestWateringDate.getFullYear() &&
                    selectedDate.getMonth() === oldestWateringDate.getMonth()
                }
            >
                <span className="icon">
                    <i className="fas fa-chevron-left"></i>
                </span>
            </button>
            <h2 className="subtitle has-text-centered is-capitalized mx-4 mb-0">
                {selectedDate.toLocaleDateString(intl.locale, { month: 'long', year: 'numeric' })}
            </h2>
            <button
                className="button is-ghost"
                onClick={() => navigateMonth(1)}
                disabled={
                    selectedDate.getFullYear() === futureLimit.getFullYear() &&
                    selectedDate.getMonth() === futureLimit.getMonth()
                }
            >
                <span className="icon">
                    <i className="fas fa-chevron-right"></i>
                </span>
            </button>
        </div>
    );
};

export default CalendarHeader; 
import React from 'react';
import { getStandardizedDate, getDayOfWeekLetter } from "./utils/calendar-helpers";
import PlantTableRow from "./PlantTableRow";
import { FormattedMessage, useIntl } from 'react-intl';

const PlantsTable = ({
    daysInMonth,
    selectedDate,
    currentDay,
    getGroupedPlants,
    userPlants,
    editModal,
    wateringModal,
    onDeleteClick
}) => {
    const intl = useIntl();
    const isCurrentMonth = selectedDate.getMonth() === getStandardizedDate().getMonth() &&
        selectedDate.getFullYear() === getStandardizedDate().getFullYear();

    return (
        <div className="boxNew">
            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth is-narrow">
                    <thead>
                        <tr>
                            <th style={{ width: '3%' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.id' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-hashtag"></i></span>
                                </span>
                            </th>
                            <th style={{ width: '10%' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.name' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-leaf"></i></span>
                                </span>
                            </th>
                            <th style={{ width: '5%', minWidth: '15%' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.location' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
                                </span>
                            </th>
                            <th style={{ width: '5%' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.mycorrhiza' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-seedling"></i></span>
                                </span>
                            </th>
                            <th style={{ width: '3%' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.avgWatering' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-clock"></i></span>
                                </span>
                            </th>
                            {[...Array(daysInMonth)].map((_, index) => (
                                <th
                                    key={index + 1}
                                    className={`has-text-centered is-vcentered ${index + 1 === currentDay && isCurrentMonth
                                        ? 'has-background-grey-darker'
                                        : ''
                                        }`}
                                    style={{ width: '2%', minWidth: '2%' }}
                                >
                                    <div className="is-flex is-flex-direction-column">
                                        <small className="has-text-grey">
                                            <FormattedMessage id={getDayOfWeekLetter(index + 1, selectedDate)} />
                                        </small>
                                        <span>{index + 1}</span>
                                    </div>
                                </th>
                            ))}
                            <th style={{ width: '5%', padding: '0' }} className="has-text-centered is-vcentered">
                                <span data-tooltip={intl.formatMessage({ id: 'plants.tooltip.actions' })} className="has-tooltip-arrow has-text-centered">
                                    <span className="icon"><i className="fas fa-tools"></i></span>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getGroupedPlants().map(({ taxonomicPath, plants }) => (
                            <React.Fragment key={taxonomicPath}>
                                <tr>
                                    <th colSpan={daysInMonth + 5} className="has-text-left">
                                        <span className="icon-text">
                                            <span className="icon has-text-grey-lighter">
                                                <i className="fas fa-folder"></i>
                                            </span>
                                            <span className="has-text-grey-lighter">{taxonomicPath}</span>
                                            <span className="ml-2 has-text-grey-light">
                                                ({plants.length} <FormattedMessage id="calendar.plants" />)
                                            </span>
                                        </span>
                                    </th>
                                </tr>
                                {plants.map((userPlant) => (
                                    <PlantTableRow
                                        key={userPlant.id}
                                        userPlant={userPlant}
                                        selectedDate={selectedDate}
                                        daysInMonth={daysInMonth}
                                        currentDay={currentDay}
                                        isCurrentMonth={isCurrentMonth}
                                        onEdit={editModal.openModal}
                                        onWater={wateringModal.openModal}
                                        onDelete={() => onDeleteClick(userPlant)}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                        <tr className="has-background-grey-darker">
                            <th colSpan={daysInMonth + 5} className="has-text-centered">
                                <span className="has-text-grey-lighter">
                                    <strong>
                                        <FormattedMessage 
                                            id="plants.total" 
                                            values={{ count: userPlants.length }}
                                        />
                                    </strong>
                                </span>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlantsTable; 
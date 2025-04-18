import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const PlantInfo = ({ plant, location, mycorrhiza, averageInterval }) => {
    const intl = useIntl();
    const tooltipText = `${intl.formatMessage(
        { id: 'plants.commonName.tooltip' }, 
        { name: plant.plant?.common_name }
    )}\n${intl.formatMessage(
        { id: 'plants.acquiredDate.tooltip' }, 
        { date: plant.acquired_date || intl.formatMessage({ id: 'plants.acquiredDate.notAvailable' }) }
    )}`;

    return (
        <>
            <td>{plant.id}</td>
            <td className="has-text-nowrap">
                <div
                    data-tooltip={tooltipText}
                    className="has-tooltip-arrow has-tooltip-multiline has-tooltip-text-centered"
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                    {plant.plant?.scientific_name || <FormattedMessage id="common.notAvailable" />}
                </div>
            </td>
            <td className="has-text-nowrap">
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {location}
                </div>
            </td>
            <td className="has-text-centered">
                {mycorrhiza ? (
                    <span className="icon has-text-success">
                        <i className="fas fa-check"></i>
                    </span>
                ) : ""}
            </td>
            <td className="has-text-right">
                {averageInterval
                    ? `${Number(averageInterval).toFixed(1)}d`
                    : ""
                }
            </td>
        </>
    );
};

export default PlantInfo; 
import React from 'react';

const PlantActions = ({ 
    onEdit, 
    onWater, 
    onDelete 
}) => {
    return (
        <div className="is-flex" style={{ height: '100%' }}>
            <button
                className="button is-info is-small"
                onClick={onEdit}
                style={{
                    borderRadius: '0',
                    margin: '0',
                    flexGrow: '1',
                    height: '100%',
                    border: 'none'
                }}
            >
                <span className="icon is-small has-text-white">
                    <i className="fas fa-edit"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={onWater}
                style={{
                    borderRadius: '0',
                    margin: '0',
                    flexGrow: '1',
                    height: '100%',
                    border: 'none'
                }}
            >
                <span className="icon is-small has-text-white">
                    <i className="fas fa-tint"></i>
                </span>
            </button>
            <button
                className="button is-danger is-small"
                onClick={onDelete}
                style={{
                    borderRadius: '0',
                    margin: '0',
                    flexGrow: '1',
                    height: '100%',
                    border: 'none'
                }}
            >
                <span className="icon is-small has-text-white">
                    <i className="fas fa-trash"></i>
                </span>
            </button>
        </div>
    );
};

export default PlantActions; 
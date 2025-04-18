"use client";
import React, { useState } from 'react';
import { addWateringLog } from '@/lib/api/wateringLogs';
import { FormattedMessage, useIntl } from 'react-intl';

const WateringModal = ({ plant, closeModal }) => {
    const intl = useIntl();
    const [formData, setFormData] = useState({
        watering_date: new Date().toLocaleDateString('es-AR', { 
            timeZone: 'America/Argentina/Buenos_Aires',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).split('/').reverse().join('-'),
        watering_method: 'surface',
        with_fertilizer: false,
        with_slow_release: false,
        with_trichoderma: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addWateringLog(plant.id, formData);
            closeModal();
        } catch (error) {
            console.error('Error registrando riego:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const newData = { ...prev };
            if (type === 'checkbox') {
                if (name === 'with_fertilizer' && checked) {
                    newData.with_slow_release = false;
                } else if (name === 'with_slow_release' && checked) {
                    newData.with_fertilizer = false;
                }
                newData[name] = checked;
            } else {
                newData[name] = value;
            }
            return newData;
        });
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        {plant.plant?.scientific_name || 'N/A'}
                        <br />
                        <small className="has-text-grey">
                            {plant.plant?.common_name || 'N/A'}
                            {plant.nickname && ` - ${plant.nickname}`}
                        </small>
                    </p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="watering.date" />
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    name="watering_date"
                                    value={formData.watering_date}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="watering.method" />
                            </label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="watering_method"
                                        value={formData.watering_method}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            <FormattedMessage id="watering.method.select" />
                                        </option>
                                        <option value="surface">
                                            <FormattedMessage id="watering.method.surface" />
                                        </option>
                                        <option value="immersion">
                                            <FormattedMessage id="watering.method.immersion" />
                                        </option>
                                        <option value="spraying">
                                            <FormattedMessage id="watering.method.spraying" />
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="with_fertilizer"
                                    checked={formData.with_fertilizer}
                                    onChange={handleChange}
                                />
                                {' '}
                                <FormattedMessage id="watering.withFertilizer" />
                            </label>
                        </div>

                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="with_slow_release"
                                    checked={formData.with_slow_release}
                                    onChange={handleChange}
                                />
                                {' '}
                                <FormattedMessage id="watering.withSlowRelease" />
                            </label>
                        </div>

                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="with_trichoderma"
                                    checked={formData.with_trichoderma}
                                    onChange={handleChange}
                                />
                                {' '}
                                <FormattedMessage id="watering.withTrichoderma" />
                            </label>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-success">
                                    <FormattedMessage id="common.save" />
                                </button>
                            </div>
                            <div className="control">
                                <button type="button" className="button" onClick={closeModal}>
                                    <FormattedMessage id="common.cancel" />
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default WateringModal; 
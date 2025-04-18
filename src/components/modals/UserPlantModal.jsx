"use client";
import React, { useState, useEffect } from 'react';
import { addUserPlant, updateUserPlant } from '@/lib/api/userPlants';
import { fetchPlants } from '@/lib/api/plants';
import { FormattedMessage, useIntl } from 'react-intl';

const UserPlantModal = ({ closeModal, userPlant = null, onUpdate = null }) => {
    const intl = useIntl();
    const [plants, setPlants] = useState([]);
    const [formData, setFormData] = useState({
        plant_id: userPlant?.plant_id || '',
        user_id: 1,
        nickname: userPlant?.nickname || '',
        location: userPlant?.location || '',
        notes: userPlant?.notes || '',
        acquired_date: userPlant?.acquired_date || new Date().toISOString().split('T')[0],
        death_date: userPlant?.death_date || '',
        mycorrhiza: userPlant?.mycorrhiza || false
    });

    const isEditing = !!userPlant;

    useEffect(() => {
        const loadPlants = async () => {
            try {
                const response = await fetchPlants();
                setPlants(response.data || []);
            } catch (error) {
                console.error('Error cargando plantas:', error);
            }
        };
        loadPlants();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const updatedPlant = await updateUserPlant(userPlant.id, formData);
                if (onUpdate) onUpdate(updatedPlant);
            } else {
                await addUserPlant(formData);
            }
            closeModal();
        } catch (error) {
            console.error(isEditing ? 'Error actualizando planta:' : 'Error creando planta:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        <FormattedMessage 
                            id={isEditing ? 'modal.editPlant' : 'modal.addPlant'} 
                        />
                    </p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="plants.title" />
                            </label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="plant_id"
                                        value={formData.plant_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            <FormattedMessage id="plants.select" />
                                        </option>
                                        {plants.map(plant => (
                                            <option key={plant.id} value={plant.id}>
                                                {plant.scientific_name} - {plant.common_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="plants.nickname" />
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'plants.nickname' })}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="common.location" />
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    placeholder={intl.formatMessage({ id: 'plants.location.placeholder' })}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="common.notes" />
                            </label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder={intl.formatMessage({ id: 'plants.notes.placeholder' })}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="plants.acquiredDate" />
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    name="acquired_date"
                                    value={formData.acquired_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">
                                <FormattedMessage id="plants.deathDate" />
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    name="death_date"
                                    value={formData.death_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="mycorrhiza"
                                    checked={formData.mycorrhiza}
                                    onChange={handleChange}
                                />
                                {' '}
                                <FormattedMessage id="plants.tooltip.mycorrhiza" />
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

export default UserPlantModal;

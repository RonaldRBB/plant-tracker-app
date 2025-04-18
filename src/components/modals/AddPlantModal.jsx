"use client";
import React, { useState, useEffect } from 'react';
import { addUserPlant } from '@/lib/api/userPlants';
import { fetchPlants } from '@/lib/api/plants';

const AddUserPlantModal = ({ closeModal }) => {
    const [plants, setPlants] = useState([]);
    const [formData, setFormData] = useState({
        plant_id: '',
        location: '',
        mycorrhiza: false
    });

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
            await addUserPlant(formData);
            closeModal();
        } catch (error) {
            console.error('Error creando planta:', error);
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
                    <p className="modal-card-title">Agregar Nueva Planta</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Planta</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="plant_id"
                                        value={formData.plant_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecciona una planta</option>
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
                            <label className="label">Ubicación</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
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
                                {' '}Micorrizas
                            </label>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-primary">Guardar</button>
                            </div>
                            <div className="control">
                                <button type="button" className="button" onClick={closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddUserPlantModal;

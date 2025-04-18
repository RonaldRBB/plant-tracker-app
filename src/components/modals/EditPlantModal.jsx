import React, { useState } from 'react';
import { updateUserPlant } from '@/lib/api/userPlants';

const EditPlantModal = ({ plant, closeModal, onUpdate }) => {
    const [formData, setFormData] = useState({
        id: plant.id,
        plant_id: plant.plant_id,
        location: plant.location,
        mycorrhiza: plant.mycorrhiza || false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPlant = await updateUserPlant(formData.id, formData);
            onUpdate(updatedPlant);
            closeModal();
        } catch (error) {
            console.error('Error updating plant:', error);
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
                    <p className="modal-card-title">Editar Planta</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">ID de la Planta</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="plant_id"
                                    value={formData.plant_id}
                                    onChange={handleChange}
                                    required
                                />
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

export default EditPlantModal;

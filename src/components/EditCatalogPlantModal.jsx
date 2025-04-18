import React, { useState } from 'react';
import { updatePlant } from '@/lib/api/plants';
import Modal from './Modal';
import { FormattedMessage } from 'react-intl';

const EditCatalogPlantModal = ({ plant, closeModal, onUpdate }) => {
    const [formData, setFormData] = useState({
        scientific_name: plant.scientific_name || '',
        common_name: plant.common_name || '',
        dli: plant.dli === null ? '' : plant.dli,
        taxonomic_classification_id: plant.taxonomic_classification_id || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPlant = await updatePlant(plant.id, formData);
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
        <Modal isActive={true} onClose={closeModal} title={<FormattedMessage id="plants.edit" defaultMessage="Editar Planta" />}>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">
                        <FormattedMessage id="plants.scientificName" defaultMessage="Nombre Científico" />
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="scientific_name"
                            value={formData.scientific_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">
                        <FormattedMessage id="plants.commonName" defaultMessage="Nombre Común" />
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="common_name"
                            value={formData.common_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">
                        <FormattedMessage id="plants.dli" defaultMessage="DLI" />
                    </label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            name="dli"
                            value={formData.dli}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button type="button" className="button is-light" onClick={closeModal}>
                            <FormattedMessage id="common.cancel" defaultMessage="Cancelar" />
                        </button>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            <FormattedMessage id="common.save" defaultMessage="Guardar" />
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default EditCatalogPlantModal; 
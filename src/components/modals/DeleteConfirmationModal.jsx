"use client";
import React from 'react';
import { FormattedMessage } from 'react-intl';

const DeleteConfirmationModal = ({ closeModal, onConfirm, plantName }) => {
    const handleConfirm = () => {
        onConfirm();
        closeModal();
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        <FormattedMessage id="modal.deletePlant" defaultMessage="Eliminar Planta" />
                    </p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <p>
                        <FormattedMessage 
                            id="modal.deletePlantConfirmation" 
                            defaultMessage="¿Estás seguro que deseas eliminar la planta {plantName}?"
                            values={{ plantName }}
                        />
                    </p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={handleConfirm}>
                        <FormattedMessage id="button.delete" defaultMessage="Eliminar" />
                    </button>
                    <button className="button" onClick={closeModal}>
                        <FormattedMessage id="button.cancel" defaultMessage="Cancelar" />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal; 
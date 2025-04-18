import React from 'react';

const Modal = ({ isActive, closeModal, title, children, footer }) => {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button 
                        className="delete" 
                        aria-label="close" 
                        onClick={closeModal}
                    ></button>
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                {footer && (
                    <footer className="modal-card-foot">
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Modal; 
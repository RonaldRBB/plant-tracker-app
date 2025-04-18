import { useState } from 'react';

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [data, setData] = useState(null);

    const openModal = (modalData = null) => {
        setData(modalData);
        setIsOpen(true);
    };

    const closeModal = () => {
        setData(null);
        setIsOpen(false);
    };

    return {
        isOpen,
        data,
        openModal,
        closeModal
    };
}; 
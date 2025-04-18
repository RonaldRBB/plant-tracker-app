"use client";
import React, { useEffect, useState } from "react";
import { useWeather } from '@/hooks/useWeather';
import { usePlants } from '@/hooks/usePlants';
import { useModal } from '@/hooks/useModal';
import { useCalendarNavigation } from '@/hooks/useCalendarNavigation';
import UserPlantModal from "@/components/modals/UserPlantModal";
import WateringModal from "@/components/modals/WateringModal";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import CalendarHeader from "@/components/my-plants/CalendarHeader";
import PlantsTable from "@/components/my-plants/PlantsTable";
import CurrentWeather from "@/components/CurrentWeather";
import { getStandardizedDate, getDayOfWeekLetter, getDaysInSelectedMonth } from "@/components/my-plants/utils/calendar-helpers";
import { getCurrentDay } from '@/lib/utils/dateUtils';
import { FormattedMessage } from 'react-intl';
import LoadingSpinner from "@/components/LoadingSpinner";

const MyPlants = () => {
    const { weather } = useWeather();
    const { 
        userPlants, 
        loading: plantsLoading, 
        error: plantsError,
        loadUserPlants,
        handleUpdatePlant,
        handleDeletePlant,
        getGroupedPlants 
    } = usePlants();

    const {
        selectedDate,
        daysInMonth,
        currentDay,
        navigateMonth,
        getOldestWateringDate
    } = useCalendarNavigation(userPlants);

    const addModal = useModal();
    const editModal = useModal();
    const wateringModal = useModal();
    const deleteModal = useModal();

    const [plantToDelete, setPlantToDelete] = useState(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        loadUserPlants();
    }, [loadUserPlants]);

    useEffect(() => {
        if (!plantsLoading) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 500); // Esperar a que termine la animación de fade out
            return () => clearTimeout(timer);
        }
    }, [plantsLoading]);

    const handleDeleteClick = (plant) => {
        setPlantToDelete(plant);
        deleteModal.openModal();
    };

    const confirmDelete = async () => {
        if (plantToDelete) {
            await handleDeletePlant(plantToDelete.id);
            setPlantToDelete(null);
        }
    };

    if (plantsLoading) return <LoadingSpinner />;
    if (plantsError) return <div className="notification is-danger"><FormattedMessage id="message.error" defaultMessage="Error" />: {plantsError}</div>;

    return (
        <div className={`container is-fluid p-4 ${showContent ? 'fade-in' : ''}`} style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
        }}>
            <h1 className="title has-text-centered">
                <FormattedMessage id="nav.myPlants" defaultMessage="Mis Plantas" />
            </h1>
            {weather && <CurrentWeather weather={weather} />}
            
            <button className="button is-primary is-fullwidth" onClick={addModal.openModal}>
                <FormattedMessage id="modal.addPlant" defaultMessage="Agregar Planta" />
            </button>

            {addModal.isOpen && (
                <UserPlantModal 
                    closeModal={() => {
                        addModal.closeModal();
                        loadUserPlants();
                    }} 
                />
            )}

            {editModal.isOpen && editModal.data && (
                <UserPlantModal
                    userPlant={editModal.data}
                    closeModal={() => {
                        editModal.closeModal();
                        loadUserPlants();
                    }}
                    onUpdate={handleUpdatePlant}
                />
            )}

            {wateringModal.isOpen && wateringModal.data && (
                <WateringModal 
                    plant={wateringModal.data} 
                    closeModal={() => {
                        wateringModal.closeModal();
                        loadUserPlants();
                    }} 
                />
            )}

            {deleteModal.isOpen && plantToDelete && (
                <DeleteConfirmationModal
                    plantName={`${plantToDelete.plant.scientific_name} - ${plantToDelete.location}`}
                    closeModal={() => {
                        deleteModal.closeModal();
                        setPlantToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}

            <div className="table-container is-fullhd" style={{ marginTop: "20px", overflowX: "hidden" }}>
                <CalendarHeader
                    selectedDate={selectedDate}
                    navigateMonth={navigateMonth}
                    oldestWateringDate={getOldestWateringDate()}
                />

                <PlantsTable
                    daysInMonth={daysInMonth}
                    selectedDate={selectedDate}
                    currentDay={currentDay}
                    getGroupedPlants={getGroupedPlants}
                    userPlants={userPlants}
                    editModal={editModal}
                    wateringModal={wateringModal}
                    onDeleteClick={handleDeleteClick}
                />
            </div>
        </div>
    );
};

export default MyPlants;

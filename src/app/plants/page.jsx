'use client';
import { useEffect, useState } from "react";
import { fetchPlants } from "@/lib/api/plants";
import EditCatalogPlantModal from "@/components/EditCatalogPlantModal";
import { FormattedMessage } from 'react-intl';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PlantTable() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        async function getPlants() {
            try {
                const data = await fetchPlants();
                setPlants(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getPlants();
    }, []);

    useEffect(() => {
        if (!loading) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const handleEditPlant = (plant) => {
        setSelectedPlant(plant);
        setIsEditModalOpen(true);
    };

    const handleUpdatePlant = (updatedPlant) => {
        setPlants(plants.map(plant => 
            plant.id === updatedPlant.id ? updatedPlant : plant
        ));
    };

    const closeEditModal = () => {
        setSelectedPlant(null);
        setIsEditModalOpen(false);
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="notification is-danger"><FormattedMessage id="message.error" defaultMessage="Error" />: {error}</div>;

    return (
        <div className={`container is-fluid p-4 ${showContent ? 'fade-in' : ''}`} style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
        }}>
            <h1 className="title has-text-centered">
                <FormattedMessage id="plants.title" defaultMessage="Plantas" />
            </h1>
            {isEditModalOpen && selectedPlant && (
                <EditCatalogPlantModal 
                    plant={selectedPlant} 
                    closeModal={closeEditModal}
                    onUpdate={handleUpdatePlant}
                />
            )}
            <div className="boxNew">
                <div className="table-container">
                    <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th style={{ width: '3%' }} className="has-text-centered is-vcentered">
                                    <FormattedMessage id="common.id" defaultMessage="#" />
                                </th>
                                <th style={{ width: '20%' }} className="has-text-centered is-vcentered">
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FormattedMessage id="plants.scientificName" defaultMessage="Nombre Científico" />
                                    </div>
                                </th>
                                <th style={{ width: '20%' }} className="has-text-centered is-vcentered">
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FormattedMessage id="plants.commonName" defaultMessage="Nombre Común" />
                                    </div>
                                </th>
                                <th style={{ width: '10%' }} className="has-text-centered is-vcentered">
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <FormattedMessage id="plants.dli" defaultMessage="DLI" />
                                    </div>
                                </th>
                                <th style={{ width: '5%' }} className="has-text-centered is-vcentered">
                                    <FormattedMessage id="common.actions" defaultMessage="Acciones" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {plants.map(plant => (
                                <tr key={plant.id}>
                                    <td className="has-text-centered">{plant.id}</td>
                                    <td className="has-text-nowrap">
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {plant.scientific_name}
                                        </div>
                                    </td>
                                    <td className="has-text-nowrap">
                                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {plant.common_name}
                                        </div>
                                    </td>
                                    <td className="has-text-centered">{plant.dli}</td>
                                    <td className="has-text-centered">
                                        <button
                                            className="button is-info is-small"
                                            onClick={() => handleEditPlant(plant)}
                                        >
                                            <span className="icon is-small has-text-white">
                                                <i className="fas fa-edit"></i>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

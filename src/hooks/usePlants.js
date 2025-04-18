import { useEffect, useState } from 'react';
import { fetchUserPlants, deleteUserPlant } from '@/lib/api/userPlants';
import { useIntl } from 'react-intl';

export const usePlants = () => {
    const [userPlants, setUserPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const intl = useIntl();

    const loadUserPlants = async () => {
        try {
            const response = await fetchUserPlants();
            setUserPlants(response.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserPlants();
    }, []);

    const handleUpdatePlant = (updatedPlant) => {
        setUserPlants(userPlants.map(plant => 
            plant.id === updatedPlant.id ? updatedPlant : plant
        ));
    };

    const handleDeletePlant = async (plantId) => {
        try {
            await deleteUserPlant(plantId);
            setUserPlants(userPlants.filter(plant => plant.id !== plantId));
        } catch (err) {
            setError(err.message);
        }
    };

    const getGroupedPlants = () => {
        if (!userPlants || !userPlants.length) return [];

        const getTaxonomicKey = (plant) => {
            const taxonomic = plant.plant?.taxonomic_classification || {};
            return [
                taxonomic.kingdom || intl.formatMessage({ id: 'taxonomic.noKingdom' }),
                taxonomic.division || intl.formatMessage({ id: 'taxonomic.noDivision' }),
                taxonomic.class || intl.formatMessage({ id: 'taxonomic.noClass' }),
                taxonomic.order || intl.formatMessage({ id: 'taxonomic.noOrder' }),
                taxonomic.family || intl.formatMessage({ id: 'taxonomic.noFamily' })
            ];
        };

        const grouped = userPlants.reduce((acc, plant) => {
            const taxonomic = plant.plant?.taxonomic_classification || {};
            const sortKey = getTaxonomicKey(plant).join(' > ');
            const displayKey = taxonomic.family || intl.formatMessage({ id: 'taxonomic.noFamily' });

            if (!acc[sortKey]) {
                acc[sortKey] = {
                    displayName: displayKey,
                    taxonomicLevels: getTaxonomicKey(plant),
                    plants: []
                };
            }
            acc[sortKey].plants.push(plant);
            return acc;
        }, {});

        return Object.entries(grouped)
            .sort(([_, groupA], [__, groupB]) => {
                return groupA.displayName.localeCompare(groupB.displayName);
            })
            .map(([_, { displayName, plants }]) => ({
                taxonomicPath: displayName,
                plants: plants.sort((a, b) => {
                    const scientificNameA = a.plant?.scientific_name || '';
                    const scientificNameB = b.plant?.scientific_name || '';
                    return scientificNameA.localeCompare(scientificNameB);
                })
            }));
    };

    return {
        userPlants,
        loading,
        error,
        loadUserPlants,
        handleUpdatePlant,
        handleDeletePlant,
        getGroupedPlants
    };
}; 
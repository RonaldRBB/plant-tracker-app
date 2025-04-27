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

    const getGroupedPlants = (groupBy = 'genus') => {
        if (!userPlants || !userPlants.length) return [];

        if (groupBy === 'location') {
            const grouped = userPlants.reduce((acc, plant) => {
                const location = plant.location || intl.formatMessage({ id: 'plants.location.unknown' });
                if (!acc[location]) {
                    acc[location] = {
                        displayName: location,
                        plants: []
                    };
                }
                acc[location].plants.push(plant);
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
        }

        if (groupBy === 'watering') {
            const grouped = {
                'trichoderma': {
                    displayName: intl.formatMessage({ id: 'watering.type.trichoderma' }),
                    plants: []
                },
                'fertilizer': {
                    displayName: intl.formatMessage({ id: 'watering.type.fertilizer' }),
                    plants: []
                },
                'normal': {
                    displayName: intl.formatMessage({ id: 'watering.type.normal' }),
                    plants: []
                }
            };

            userPlants.forEach(plant => {
                const nextWatering = plant.next_watering_date;
                if (nextWatering) {
                    if (nextWatering.with_trichoderma) {
                        grouped.trichoderma.plants.push(plant);
                    } else if (nextWatering.with_fertilizer) {
                        grouped.fertilizer.plants.push(plant);
                    } else {
                        grouped.normal.plants.push(plant);
                    }
                } else {
                    grouped.normal.plants.push(plant);
                }
            });

            return Object.entries(grouped)
                .filter(([_, group]) => group.plants.length > 0)
                .map(([_, { displayName, plants }]) => ({
                    taxonomicPath: displayName,
                    plants: plants.sort((a, b) => {
                        const dateA = a.next_watering_date?.date ? new Date(a.next_watering_date.date) : new Date('9999-12-31');
                        const dateB = b.next_watering_date?.date ? new Date(b.next_watering_date.date) : new Date('9999-12-31');
                        return dateA - dateB;
                    })
                }));
        }

        // Organización por género (código existente)
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
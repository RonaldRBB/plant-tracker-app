import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchUserPlants() {
    try {
        const response = await axios.get(`${API_BASE_URL}/user-plants`, {
            params: {
                order_by: 'plant_id',
                sort: 'desc',
                with: ['plant', 'wateringLogs']
            }
        });
        if (response.data.status === "success") {
            return response.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch user plants.");
        }
    } catch (error) {
        console.error("Error fetching user plants:", error.message);
        throw error;
    }
}

export async function addUserPlant(formData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user-plants`, formData);
        return response.data;
    } catch (error) {
        console.error("Error adding user plant:", error.message);
        throw error;
    }
}

export async function updateUserPlant(plantId, formData) {
    try {
        const response = await axios.put(`${API_BASE_URL}/user-plants/${plantId}`, formData);
        return response.data.data;
    } catch (error) {
        console.error("Error updating user plant:", error.message);
        throw error;
    }
}

export async function deleteUserPlant(userPlantId) {
    try {
        await axios.delete(`${API_BASE_URL}/user-plants/${userPlantId}`);
    } catch (error) {
        console.error("Error deleting user plant:", error.message);
        throw error;
    }
}

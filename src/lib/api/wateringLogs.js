import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addWateringLog(userPlantId, wateringData) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/watering-logs`,
            {
                ...wateringData,
                user_plant_id: userPlantId
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error adding watering log:", error.message);
        throw error;
    }
}

export async function fetchWateringLogs(params = {}) {
    try {
        const response = await axios.get(`${API_BASE_URL}/watering-logs`, { params });
        if (response.data.status === "success") {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch watering logs.");
        }
    } catch (error) {
        console.error("Error fetching watering logs:", error.message);
        throw error;
    }
}

export async function updateWateringLog(logId, wateringData) {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/watering-logs/${logId}`,
            wateringData
        );
        return response.data.data;
    } catch (error) {
        console.error("Error updating watering log:", error.message);
        throw error;
    }
}

export async function deleteWateringLog(logId) {
    try {
        await axios.delete(`${API_BASE_URL}/watering-logs/${logId}`);
    } catch (error) {
        console.error("Error deleting watering log:", error.message);
        throw error;
    }
} 
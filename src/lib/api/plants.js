import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPlants = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/plants`);
        if (response.data.status === "success") {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to fetch plants.");
        }
    } catch (error) {
        console.error("Error fetching plants:", error.message);
        throw error;
    }
};

export const updatePlant = async (plantId, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/plants/${plantId}`, formData);
        if (response.data.status === "success") {
            return response.data.data;
        } else {
            throw new Error(response.data.message || "Failed to update plant.");
        }
    } catch (error) {
        console.error("Error updating plant:", error.message);
        throw error;
    }
};

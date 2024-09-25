import apiClient from "./apiClient";

export const getAllRecipes = async (limit) => {
    try {
        const params = limit ? { _limit: limit } : {};
        const response = await apiClient.get("/api/recipes", { params });
        return response.data;
    } catch (error) {
        throw new Error("Error loading recipes data.");
    }
}

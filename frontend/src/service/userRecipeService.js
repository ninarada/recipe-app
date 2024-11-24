import apiClient from "./apiClient";

export const getInteraction = async (recipeId) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 
        const userId = userData?._id; 

        if (!recipeId || !userId) {
            throw new Error("Missing recipeId or userId");
        }

        const response = await apiClient.get(`/api/interactions/userRecipeInteraction?userId=${userId}&recipeId=${recipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 404 || !response.data) {
            return undefined;  
        }
        
        return response.data;
    } catch (error) {
        throw new Error("Error loading interaction.");
    }
}

export const updateInteraction = async (recipeId, caseName, value) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 
        const userId = userData?._id; 

        if (!recipeId || !userId) {
            throw new Error("Missing recipeId or userId");
        }

        const response = await apiClient.post(`/api/interactions/userRecipeInteraction`, {
            userId: userId,
            recipeId: recipeId,
            caseName,
            value,
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error("Error updating interaction.");
    }
}
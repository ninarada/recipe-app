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

export const getLikedRecipes = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 
        const userId = userData?._id;

        const response = await apiClient.get(`/api/interactions/likedRecipes?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const likedRecipes = response.data.map(item => item.recipe);

        return likedRecipes;
        
    } catch (error) {
        throw new Error("Error loading liked recipes of logged in user.");
    }
}

export const getBookmarkedRecipes = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 
        const userId = userData?._id;

        const response = await apiClient.get(`/api/interactions/bookmarkedRecipes?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const bookmarkedRecipes = response.data.map(item => item.recipe);

        return bookmarkedRecipes;
        
    } catch (error) {
        throw new Error("Error loading liked recipes of logged in user.");
    }
}

export const getRatedRecipes = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 
        const userId = userData?._id;

        const response = await apiClient.get(`/api/interactions/ratedRecipes?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const ratedRecipes = response.data.map(item => item.recipe);

        return ratedRecipes;
        
    } catch (error) {
        throw new Error("Error loading liked recipes of logged in user.");
    }
}
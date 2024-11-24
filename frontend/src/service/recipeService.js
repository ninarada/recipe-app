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

export const getRecipeById = async(id) => {
    try {
        const response = await apiClient.get(`/api/recipes/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Error loading recipe by id.");
    }
}

export const getMyRecipes = async() => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 

        const response = await apiClient.get('/api/recipes/myProfile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Error loading recipes of logged in user.");
    }
}

export const createRecipe = async (title, description,  ingredients, instructions, time_consuming, difficulty, photo, tags) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 

        const response = await apiClient.post('/api/recipes/create', 
            {
                title,
                description,
                ingredients,  
                instructions,  
                time_consuming, 
                difficulty, 
                photo,  
                tags,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error creating recipe. Please try again.");
        }
    }
}

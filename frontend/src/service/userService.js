import apiClient from "./apiClient";

export const registerUser = async (username, email, password) => {
    try {
        const response = await apiClient.post('/api/users/register', {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error registering. Please try again.");
        }
    }
}

export const loginUser = async (username, password) => {
    try {
        const response = await apiClient.post('/api/users/login', {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error logging in. Please try again.");
        }
    }
}
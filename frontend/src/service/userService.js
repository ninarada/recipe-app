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

export const getMyProfile = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token; 

        const response = await apiClient.get('/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data
    } catch (error) {
        throw new Error("Error loading user profile.");
    }
}


export const saveProfile = async (username, email, photo) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token;

        const response = await apiClient.put('/api/users/profile', 
            { username, email, photo }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Optionally, you can store the updated user data in localStorage or update the state
        localStorage.setItem('userData', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        throw new Error("Error saving user profile.");
    }
}

export const saveProfilePassword = async (currentPassword, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
        alert("Passwords don't match.");
        return { success: false };
    }

    if (newPassword === currentPassword) {
        alert("New password cannot be the same as the current password.");
        return { success: false };
    }

    if (newPassword.length < 6) {
        alert("New password must be at least 6 characters long.");
        return { success: false };
    }

    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData?.token;

        const response = await apiClient.put('/api/users/change-password', 
            { currentPassword, newPassword, }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.message === 'Incorrect current password') {
            alert(response.data.message); 
            return { success: false };
        }

        alert(response.data.message); 
        return { success: true, data: response.data };
    } catch (error) {
        if(error.response.status === 400) {
            alert('Incorrect current password');
        } else {
            alert("Error changing password. Please try again later.");
        }
        
        return { success: false };
    }
}
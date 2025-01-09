import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://recipe-app-tll1.onrender.com",
    // baseURL: "http://localhost:5001",
});

export default apiClient;
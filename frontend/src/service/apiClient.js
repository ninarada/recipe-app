import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://recipe-app-tll1.onrender.com/",
});

export default apiClient;
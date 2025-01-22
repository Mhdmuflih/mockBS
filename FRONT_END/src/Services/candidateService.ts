import axios from 'axios';


const baseURL = "http://localhost:8080";

const API = axios.create({
    baseURL: baseURL,
});

// Add request interceptor
API.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("accessToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token to the headers
        }

        return config;
    },
    (error: any) => {
        console.error("Request Error:", error);
        return Promise.reject(error); // Handle request errors
    }
);


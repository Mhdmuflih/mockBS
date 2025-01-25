import axios from 'axios';


const baseURL = "http://localhost:8080";

const ProtectedAPI = axios.create({
    baseURL: baseURL,
});

// Add request interceptor
ProtectedAPI.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("adminToken");

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


export const fetchApprovalData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/approval');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const fetchInterviewerDetails = async (id: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/admin/approval-details/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const approveInterviewerData = async (id: string) => {
    try {
        const response = await ProtectedAPI.post(`/user-service/admin/approval-details/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const fetchCandidateData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/candidates');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const fetchCandidatesDetails = async (id: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/admin/candidates/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}
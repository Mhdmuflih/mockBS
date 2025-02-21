import axios from 'axios';
import { logout } from '../Store/Slice/AdminSlice';
import store from '../Store/Store';


const baseURL = "http://localhost:8000";

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

ProtectedAPI.interceptors.response.use(
    (response: any) => response, // Success path
    async (error: any) => {
        const originalRequest = error.config as any & { _retry?: boolean };
        console.log(originalRequest, 'this is the original request');

        // Check if the error is 401 (Unauthorized)
        if (originalRequest && error.response?.status === 403) {
            store.dispatch(logout());

            // window.location.replace('/');  // This will redirect to the '/' page
            return Promise.reject(error);
        }

        // Return the original error if not a 401
        return Promise.reject(error);
    }
);


export const fetchApprovalData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/approval');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the approval data process.");
    }
}


export const fetchInterviewerDetails = async (id: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/admin/approval-details/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the inteviewers details process.");
    }
}


export const approveInterviewerData = async (id: string) => {
    try {
        const response = await ProtectedAPI.post(`/user-service/admin/approval-details/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the approve interview Data process.");
    }
}


export const fetchCandidateData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/candidates');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the candidate data process.");
    }
}

export const TakeActionCandidate = async (id: string) => {
    try {
        const response = await ProtectedAPI.post(`/user-service/admin/candidate-action/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the take action candidate process.");
    }
}


export const fetchCandidatesDetails = async (id: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/admin/candidates/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the candidate details process.");
    }
}

export const fetchInterviewerData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/interviewers');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the interviewer Data process.");
    }
}

export const takeActionInterviewer = async (id: string) => {
    try {
        const response = await ProtectedAPI.post(`/user-service/admin/interviewer-action/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the tacke action interviewer process.");
    }
}

export const addStack = async (formData: any) => {
    try {
        const response = await ProtectedAPI.post('/user-service/admin/add-stack', formData);
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the add Stack process.");
    }
}

export const fetchStackList = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/stack-list');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the add Stack process.");
    }
}


export const fetchInterviewList = async () => {
    try {
        const response = await ProtectedAPI.get('/booking-service/admin/interviews');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the add Stack process.");
    }
}
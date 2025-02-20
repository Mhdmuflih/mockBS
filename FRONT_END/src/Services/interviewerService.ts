import axios from 'axios';
import store from '../Store/Store';
import { logout } from '../Store/Slice/InterviewerSlice';



const baseURL = "http://localhost:8000";

const ProtectedAPI = axios.create({
    baseURL: baseURL,
});

// Add request interceptor
ProtectedAPI.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("interviewerToken");

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

// profile image take in route protected
export const fetchProfileImage = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/interviewer/profileURL');
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const addDetailsInterviewer = async (formData: any) => {
    try {

        const response = await ProtectedAPI.patch('/user-service/interviewer/details', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });


        return response.data;
    } catch (error: any) {
        console.error('Full Error:', error);
        console.error('Error Response:', error.response?.data);
        throw new Error(error.response?.data?.message || 'An error occurred while updating details.');
    }
};



export const fetchInterviewerProfileData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/interviewer/profile');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const editProfileInterviewer = async (formData: any) => {
    try {

        const response = await ProtectedAPI.patch('/user-service/interviewer/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });


        return response.data;
    } catch (error: any) {
        console.error('Full Error:', error);
        console.error('Error Response:', error.response?.data);
        throw new Error(error.response?.data?.message || 'An error occurred while updating details.');
    }
}

export const changePassword = async (formData: { currentPassword: string, password: string, confirmPassword: string }) => {
    try {
        const response = await ProtectedAPI.patch('/user-service/interviewer/password', formData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const fetchStackData = async () => {
    try {
        const response = await ProtectedAPI.post('/user-service/interviewer/slot');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}






// another service (booking service)
// ----------------------------------------


export const addSlotInterviewer = async (formData: any) => {
    try {
        const response = await ProtectedAPI.post('/booking-service/interviewer/slot',formData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}

export const getSlotData = async () => {
    try {
        const response = await ProtectedAPI.get('/booking-service/interviewer/slot');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}
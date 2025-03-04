import axios from "axios";
import store from "../Store/Store";
import { logout } from "../Store/Slice/CandidateSlice";


const baseURL = "http://localhost:8000";

const ProtectedAPI = axios.create({
    baseURL: baseURL,
});

// Add request interceptor
ProtectedAPI.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("candidateToken");

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


// ProtectedAPI.interceptors.response.use(
//     (response: any) => response,
//     async (error: any) => {
//         const originalRequest = error.config as any & { _retry?: boolean };
//         console.log(originalRequest, 'this is the original request');
//         if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {

//             originalRequest._retry = true;

//             try {
//                 const response: any = await axios.post("http://localhost:8080/user-service/candidate/refresh-token",
//                     {},
//                     { withCredentials: true }
//                 );

//                 if(response.status === 200 ) {
//                     console.log("response:", response)
//                     store.dispatch(loginSuccess({token: response.data.token, isLoggedIn: true, storedData: response.data.candidateData}));
//                     originalRequest.headers = originalRequest.headers || {};
//                     originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;
//                     return ProtectedAPI(originalRequest);
//                 }
//             } catch (refreshError: any) {
//                 console.error("Refresh Token Error:", refreshError);
//                 store.dispatch(logout());
//                 return Promise.reject(refreshError);
//             }
//         }
//     }

// )


// profile image take in route protected
export const fetchProfileImage = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/candidate/profileURL');
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}



export const fetchCandidateProfileData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/candidate/profile');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const editProfileCandidate = async (formData: any) => {
    try {

        const response = await ProtectedAPI.patch('/user-service/candidate/profile', formData, {
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
        const response = await ProtectedAPI.patch('/user-service/candidate/password', formData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const GetStack = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/candidate/stack');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const getExpertInterviewerList = async (tech: string) => {
    try {
        const response = await ProtectedAPI.get(`/booking-service/candidate/match-interviewer/${tech}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const interviewerSlotDetails = async (interviewerId: string, tech: string) => {
    try {
        const response = await ProtectedAPI.get(`/booking-service/candidate/interviewer-slot-details/${interviewerId}?selectedTech=${tech}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const paymentForBooking = async (paymentData: any) => {
    try {
        const response = await ProtectedAPI.post('/payment-service/candidate/payment', paymentData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the payment for booking process.");
    }
}

export const updatePaymentStatus = async (sessionId: string) => {
    try {
        const response = await ProtectedAPI.post('/payment-service/candidate/verify-payment', {sessionId});
        return response.data;
    } catch (error: any) {
        console.error("update payment status Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the update payment status process.");
    }
}


export const bookingInterviewer = async (slotData: any) => {
    try {
        const response = await ProtectedAPI.post('/booking-service/candidate/schedule', slotData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the booking process.");
    }
}


export const getCandidateScheduledInterviews = async () => {
    try {
        const response = await ProtectedAPI.get('/booking-service/candidate/scheduled-interviews');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const getInterviewerDetails = async (interviewerId: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/candidate/interviewer-details/${interviewerId}`);
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

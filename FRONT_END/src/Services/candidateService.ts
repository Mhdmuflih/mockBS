import axios from "axios";
import store from "../Store/Store";
import { loginSuccess, logout } from "../Store/Slice/CandidateSlice";
import { ICandidateGetInterviewerDetails, ICandidateHomeApiResponse, ICandidateHomeInterviewerApiResponse, ICandidatePaymentAnalyiticsApiResponse, ICandidatePremiumApiResponse, ICandidateProfileApiResponse, ICandidateScheduledAnalyiticsApiResponse, IScheduledApiResponse, ISlotInterviewerApiResponse, ISuccess } from "../Interface/candidateInterfaces/IApiResponce";
import { Types } from "mongoose";



const baseURL = import.meta.env.VITE_BASE_URL;

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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("candidateRefreshToken");
                const response: any = await axios.post(`${baseURL}/auth-service/candidate/refresh-token`, { refreshToken });

                if (response.data.success) {
                    store.dispatch(loginSuccess({
                        isLoggedIn: true,
                        storedData: response.data.candidateData,
                        token: response.data.token,
                        refreshToken: response.data.refreshToken
                    }))

                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                    return ProtectedAPI(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh Token Error:", refreshError);
                store.dispatch(logout()); // Uncomment if logout is needed
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


// ProtectedAPI.interceptors.response.use(
//     (response: any) => response, // Success path
//     async (error: any) => {
//         const originalRequest = error.config as any & { _retry?: boolean };
//         console.log(originalRequest, 'this is the original request');

//         // Check if the error is 401 (Unauthorized)
//         if (originalRequest && error.response?.status === 403) {
//             store.dispatch(logout());

//             // window.location.replace('/');  // This will redirect to the '/' page
//             return Promise.reject(error);
//         }

//         // Return the original error if not a 401
//         return Promise.reject(error);
//     }
// );





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



export const fetchCandidateProfileData = async (): Promise<ICandidateProfileApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ICandidateProfileApiResponse>('/user-service/candidate/profile');
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

export const changePassword = async (formData: { currentPassword: string, password: string, confirmPassword: string }): Promise<ISuccess> => {
    try {
        const response = await ProtectedAPI.patch<ISuccess>('/user-service/candidate/password', formData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const GetStack = async (): Promise<ICandidateHomeApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ICandidateHomeApiResponse>('/user-service/candidate/stack');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const getExpertInterviewerList = async (tech: string): Promise<ICandidateHomeInterviewerApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ICandidateHomeInterviewerApiResponse>(`/booking-service/candidate/match-interviewer/${tech}`);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const interviewerSlotDetails = async (interviewerId: string, tech: string): Promise<ISlotInterviewerApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ISlotInterviewerApiResponse>(`/booking-service/candidate/interviewer-slot-details/${interviewerId}?selectedTech=${tech}`);
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

export const updatePaymentStatus = async (sessionId: string): Promise<ISuccess> => {
    try {
        const response = await ProtectedAPI.post<ISuccess>('/payment-service/candidate/verify-payment', { sessionId });
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


export const getCandidateScheduledInterviews = async (page: number, limit: number, search?: string): Promise<IScheduledApiResponse> => {
    try {
        const response = await ProtectedAPI.get<IScheduledApiResponse>('/booking-service/candidate/scheduled-interviews', {
            params: { page, limit, search }
        });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

export const getInterviewerDetails = async (interviewerId: Types.ObjectId): Promise<ICandidateGetInterviewerDetails> => {
    try {
        const response = await ProtectedAPI.get<ICandidateGetInterviewerDetails>(`/user-service/candidate/interviewer-details/${interviewerId}`);
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}



export const TakeThePremium = async (premiumData: { amount: number, duration: string }): Promise<ICandidatePremiumApiResponse> => {
    try {
        const response = await ProtectedAPI.post<ICandidatePremiumApiResponse>('/payment-service/candidate/premium', premiumData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}



export const fetchFeedBack = async (slotId: string | undefined, scheduledId: string | undefined) => {
    try {
        const response = await ProtectedAPI.get('/review-service/candidate/feedback', { params: { slotId, scheduledId } })
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const addInterviewRating = async (reviewData: { 
    interviewerId: string; 
    scheduledId: string; 
    slotId: string; 
    ratings: number; 
    comment: string; 
}): Promise<ISuccess> => {
    try {
        const response = await ProtectedAPI.post<ISuccess>('/review-service/candidate/add-review-rating', reviewData)
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


export const updatePremiumPaymentStatus = async (sessionId: string): Promise<ISuccess> => {
    try {
        const response = await ProtectedAPI.post<ISuccess>('/payment-service/candidate/verify-premium-payment', { sessionId });
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        console.error("update payment status Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the update payment status process.");
    }
}



export const fetchScheduledInterviewCount = async (): Promise<ICandidateScheduledAnalyiticsApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ICandidateScheduledAnalyiticsApiResponse>('/booking-service/candidate/interview-counts');
        return response.data;
    } catch (error: any) {
        console.error("update payment status Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the update payment status process.");
    }
}
export const fetchTotalAmount = async (): Promise<ICandidatePaymentAnalyiticsApiResponse> => {
    try {
        const response = await ProtectedAPI.get<ICandidatePaymentAnalyiticsApiResponse>('/payment-service/candidate/total-amount');
        return response.data;
    } catch (error: any) {
        console.error("update payment status Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the update payment status process.");
    }
}
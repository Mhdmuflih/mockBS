import axios from 'axios';
import store from '../Store/Store';
import { loginSuccess, logout } from '../Store/Slice/InterviewerSlice';



const baseURL = import.meta.env.VITE_BASE_URL;

const ProtectedAPI = axios.create({
    baseURL: baseURL,
});

// Add request interceptor
ProtectedAPI.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem("interviewerToken");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token} ${'interviewer'}`; // Attach the token to the headers
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

        if (error.response?.status === 403) {
            const message = error.response?.data?.message;

            // If the user is blocked, logout immediately
            if (message === "USER_BLOCKED") {
                store.dispatch(logout()); 
                return Promise.reject(error); 
            }

            // If token expired, try to refresh
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem("candidateRefreshToken");
                    const response: any = await axios.post(`${baseURL}/auth-service/interviewer/refresh-token`, { refreshToken });

                    if (response.data.success) {
                        store.dispatch(loginSuccess({
                            isLoggedIn: true,
                            storedData: response.data.candidateData,
                            token: response.data.token,
                            refreshToken: response.data.refreshToken
                        }));

                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                        return ProtectedAPI(originalRequest);
                    }
                } catch (refreshError) {
                    console.error("Refresh Token Error:", refreshError);
                    store.dispatch(logout());
                    return Promise.reject(refreshError);
                }
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

export const getCandidateDetails = async (candidateId: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/interviewer/candidate-details/${candidateId}`);
        return response.data
    } catch (error: any) {
        console.error("candidate data fetch Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch candidate data process.");
    }
}




// another service (booking service)
// ----------------------------------------


export const addSlotInterviewer = async (formData: any) => {
    try {
        const response = await ProtectedAPI.post('/booking-service/interviewer/slot', formData);
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}

export const getSlotData = async (page: number, limit: number, search?: string) => {
    try {
        const response = await ProtectedAPI.get('/booking-service/interviewer/slot', {
            params: { page, limit, search }
        });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}

export const getInterviewerScheduledInterviews = async (page: number, limit: number, search: string) => {
    try {
        const response = await ProtectedAPI.get('/booking-service/interviewer/scheduled-interviews', {
            params: { page, limit, search }
        });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch stackData process.");
    }
}





// Payment servcie
// ===========================

export const getPaymentData = async () => {
    try {
        const response = await ProtectedAPI.get("/payment-service/interviewer/payment");
        return response.data;
    } catch (error: any) {
        console.error("fetch payment Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch payement process.");
    }
}

export const wallterWithdraw = async (amount: number) => {
    try {
        const response = await ProtectedAPI.post("/payment-service/interviewer/wallet-withdraw",
            { amount }, // Pass amount as data payload
            { headers: { "Content-Type": "application/json" } } // Ensure proper headers
        ); return response.data;
    } catch (error: any) {
        console.error("fetch payment Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch payement process.");
    }
}


// review service
// ---------------------

export const addFeedback = async (feedbackData: any, detailsData: any) => {
    try {
        const response = await ProtectedAPI.post('/review-service/interviewer/feedback', { ...feedbackData, ...detailsData })
        return response.data
    } catch (error: any) {
        console.error("fetch payment Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch payement process.");
    }
}

export const fetchReviewRating = async (slotId: string, scheduledId: string) => {
    try {
        const response = await ProtectedAPI.get('/review-service/interviewer/review-rating', { params: { slotId, scheduledId } })
        return response.data
    } catch (error: any) {
        console.error("fetch payment Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch payement process.");
    }
}





export const cancelInterview = async (data: any) => {
    try {
        console.log(data,'this is data ')
        const response = await ProtectedAPI.patch('/booking-service/interviewer/cancel-interview', {data});
        return response.data;
    } catch (error: any) {
        console.error("update payment status Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the update payment status process.");
    }
}

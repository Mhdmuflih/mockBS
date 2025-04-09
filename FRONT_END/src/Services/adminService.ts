import axios from 'axios';
import { loginSuccess, logout } from '../Store/Slice/AdminSlice';
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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("adminRefreshToken");
                const response: any = await axios.post("http://localhost:8000/auth-service/admin/refresh-token", { refreshToken });

                if (response.data.success) {
                    store.dispatch(loginSuccess({
                        isLoggedIn: true,
                        storedData: response.data.adminData,
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


export const fetchApprovalData = async (page: number, limit: number, search?: string) => {
    try {
        const response = await ProtectedAPI.get(`/user-service/admin/approval`, {
            params: { page, limit, search }, // Sending pagination parameters
        });
        return response.data; // Ensure response contains { success, approvalData, totalPages }
    } catch (error: any) {
        console.error("Error fetching approval data:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch approval data.");
    }
};



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


export const fetchCandidateData = async (page: number, limit: number, search?: string) => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/candidates', {
            params: { page, limit, search }
        });
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

export const fetchInterviewerData = async (page: number, limit: number, search?: string) => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/interviewers', {
            params: { page, limit, search }
        });
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


export const fetchInterviewList = async (page: number, limit: number, search: string) => {
    try {
        const response = await ProtectedAPI.get('/booking-service/admin/interviews', {
            params:{page, limit, search}
        });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the add Stack process.");
    }
}

export const fetchInterviewerAndCandidate = async (ids: { candidateId: string; interviewerId: string }) => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/interview-details', { params: ids });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
};



export const interviewerPayment = async (page: number, limit: number, search: string) => {
    try {
        const response = await ProtectedAPI.get("/payment-service/admin/payment-details", {
            params:{page, limit, search}
        });
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}

export const getPremiumPaymentList = async () => {
    try {
        const response = await ProtectedAPI.get("/payment-service/admin/premium-payment-details",);
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}



export const PayToInterviewer = async (id: string) => {
    try {
        const response = await ProtectedAPI.post('/payment-service/admin/pay-to-interviewer', {id});
        return response.data
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}




// dashboard 
export const fetchUsers = async() => {
    try {
        const response = await ProtectedAPI.get('/user-service/admin/dashboard');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}
export const fetchPayment = async() => {
    try {
        const response = await ProtectedAPI.get('/payment-service/admin/dashboard');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}


export const fetchInterview = async() => {
    try {
        const response = await ProtectedAPI.get('/booking-service/admin/dashboard');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}


// chat service
// ==================

export const fetchCommunityList = async () => {
    try {
        const response = await ProtectedAPI.get('/chat-service/admin/communities');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the fetch process.");
    }
}
import axios from 'axios';


const baseURL = "http://localhost:8080";

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

export const addDetailsInterviewer = async (formData: any, email: string, ) => {
    try {
        const response = await ProtectedAPI.patch('/user-service/interviewer/details', { formData, email });
        return response.data;
    } catch (error: any) {
        console.error("add details interviewer Error in catch:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}

// cloudinary file update issue
// export const addDetailsInterviewer = async (form: any) => {
//     try {
//         const response = await ProtectedAPI.patch(
//             '/user-service/interviewer/details',
//             form,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//         );
//         return response.data;
//     } catch (error: any) {
//         console.error('Error in addDetailsInterviewer:', error.response?.data || error.message);
//         throw new Error(error.response?.data?.message || 'An error occurred while updating details.');
//     }
// };


export const fetchInterviewerProfileData = async () => {
    try {
        const response = await ProtectedAPI.get('/user-service/interviewer/profile');
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "An error occurred during the login process.");
    }
}


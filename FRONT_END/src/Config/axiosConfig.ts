// import axios from "axios";

import axios from "axios";

// import axios from "axios";

// const baseURL = "http://localhost:8080";

// const UnProtectedAPI = axios.create({
//     baseURL: baseURL
// });

// const ProtectedAPI = axios.create({
//     baseURL: baseURL
// })

// ProtectedAPI.interceptors.request.use((config: any) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken && config.headers) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
// });

// ProtectedAPI.interceptors.response.use(
//     (response: any) => response,
//     async (error: any) => {
//         const originalRequest = error.config;
//         console.log("Access token not valid!");

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;


//             try {

//                 const refreshToken = localStorage.getItem("refershToken");

//                 if (!refreshToken) {
//                     throw new Error("Refresh Token is not available");
//                 }

//                 const response: any = await UnProtectedAPI.post('/auth-service/refresh', { refreshToken });

//                 console.log(console.log("Data from refresh endpoint : ", response));

//                 localStorage.setItem("accessToken", response.accessToken);
//                 localStorage.setItem("refreshToken", response.refreshToken);

//                 originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`;

//                 return ProtectedAPI(originalRequest);


//             } catch (error: any) {
//                 console.error('Refresh Token Expired:', error.message);
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');
//                 window.location.href = '/';
//             }
//         }

//         // If the error is not related to token expiry, reject the promise
//         return Promise.reject(error);
//     }
// );

// export { UnProtectedAPI, ProtectedAPI };


// const baseURL = "http://localhost:8080/auth-service";

// const UnProtectedAPI = axios.create({
//     baseURL: baseURL
// });

// export { UnProtectedAPI };


const baseURL = "http://localhost:8000";

const UnProtectedAPI = axios.create({
    baseURL: `${baseURL}/auth-service`
});

export { UnProtectedAPI };


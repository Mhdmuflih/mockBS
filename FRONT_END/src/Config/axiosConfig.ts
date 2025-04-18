
import axios from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;

console.log("Resolved Base URL:", baseURL); // Should show your backend URL


const UnProtectedAPI = axios.create({
    baseURL: `${baseURL}/auth-service`
});

export { UnProtectedAPI };


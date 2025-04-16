
import axios from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;

const UnProtectedAPI = axios.create({
    baseURL: `${baseURL}/auth-service`
});

export { UnProtectedAPI };


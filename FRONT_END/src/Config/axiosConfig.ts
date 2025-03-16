
import axios from "axios";


const baseURL = "http://localhost:8000";

const UnProtectedAPI = axios.create({
    baseURL: `${baseURL}/auth-service`
});

export { UnProtectedAPI };


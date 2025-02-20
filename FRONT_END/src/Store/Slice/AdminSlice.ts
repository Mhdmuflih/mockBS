import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdmin, LoginPayload, ReduxInitialStateManage } from "../../Interface/SliceInterface";

// Check if the token exists in localStorage
const storedToken: boolean = localStorage.getItem("adminToken") ? true : false;

// Correctly parse the "admin" key, which is stored as JSON

const storedAdmin: IAdmin | null = (() => {
    const admin = localStorage.getItem("admin"); // Use the correct key here
    try {
        return admin ? JSON.parse(admin) : null; // Safely parse only valid JSON
    } catch (error) {
        console.error("Error parsing admin data from localStorage", error);
        return null; // Return null if there's an error parsing the data
    }
})();

// Define the initial state
const initialState: ReduxInitialStateManage = {
    isLoggedIn: storedToken,
    storedData: storedAdmin,
    change: false
};

// Create the admin authentication slice
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        loginSuccess: (state: ReduxInitialStateManage, action: PayloadAction<LoginPayload>) => {
            console.log("payload", action.payload.isLoggedIn);
            // Store token and admin data in localStorage
            localStorage.setItem("adminToken", action.payload.token); // JWT token
            localStorage.setItem("admin", JSON.stringify(action.payload.storedData)); // Admin object
            state.isLoggedIn = action.payload.isLoggedIn;
            state.storedData = action.payload.storedData;
        },
        logout: (state: ReduxInitialStateManage) => {
            // Clear localStorage on logout
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
            state.isLoggedIn = false;
            state.storedData = null;
        }
    }
});

// Export actions and reducer
export const { loginSuccess, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

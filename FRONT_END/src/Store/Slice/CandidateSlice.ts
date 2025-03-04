import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICandidate, LoginPayload, ReduxInitialStateManage } from "../../Interface/SliceInterface";

const storedToken: boolean = localStorage.getItem("candidateToken") ? true : false;

const storedCandidate: ICandidate | null = (() => {
    const candidate = localStorage.getItem("candidate");
    return candidate ? JSON.parse(candidate) : null; // Parse "candidate", not "candidateToken"
})();

const initialState: ReduxInitialStateManage = {
    isLoggedIn: storedToken,
    storedData: storedCandidate,
    profileURL: "",
    paymentSessionId: null,
    change: false
}

const candidateAuthSlice = createSlice({
    name: "candidateAuth",
    initialState,
    reducers: {
        loginSuccess: (state: ReduxInitialStateManage, action: PayloadAction<LoginPayload>) => {
            console.log("payload", action.payload.isLoggedIn);
            localStorage.setItem("candidateToken", action.payload.token);
            localStorage.setItem("candidate", JSON.stringify(action.payload.storedData));
            state.isLoggedIn = action.payload.isLoggedIn;
            state.storedData = action.payload.storedData;
        },
        logout: (state: ReduxInitialStateManage) => {
            localStorage.removeItem("candidateToken");
            localStorage.removeItem("candidate");
            localStorage.removeItem('profileURL');
            state.isLoggedIn = false;
            state.storedData = null;
            state.profileURL = "";
        },
        setProfileImage: (state: ReduxInitialStateManage, action: PayloadAction<{ profileURL: string }>) => {
            localStorage.setItem('profileURL', action.payload.profileURL);
            if(state){
                state.profileURL = action.payload.profileURL;
            }
        },
    }
});

export const { loginSuccess, logout, setProfileImage } = candidateAuthSlice.actions;
export default candidateAuthSlice.reducer;
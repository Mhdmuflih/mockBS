import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInterviewer, LoginPayload, ReduxInitialStateManage } from "../../Interface/SliceInterface";

const storedToken: boolean = localStorage.getItem("interviewerToken") ? true : false;

const storedInterviewer: IInterviewer | null = (() => {
    const interviewer = localStorage.getItem("interviewer");
    return interviewer ? JSON.parse(interviewer) : null; // Parse "interviewer", not "interviewerToken"
})();

const initialState: ReduxInitialStateManage = {
    isLoggedIn: storedToken,
    storedData: storedInterviewer,
    profileURL: "",
    change: false
};

const interviewerAuthSlice = createSlice({
    name: "interviewerAuth",
    initialState,
    reducers: {
        loginSuccess: (state: ReduxInitialStateManage, action: PayloadAction<LoginPayload>) => {
            console.log("payload", action.payload.isLoggedIn);
            localStorage.setItem("interviewerToken", action.payload.token);
            localStorage.setItem("interviewerRefreshToken", action.payload.refreshToken);
            localStorage.setItem("interviewer", JSON.stringify(action.payload.storedData));
            state.isLoggedIn = action.payload.isLoggedIn;
            state.storedData = action.payload.storedData;
        },
        logout: (state: ReduxInitialStateManage) => {
            localStorage.removeItem("interviewerToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("interviewer");
            state.isLoggedIn = false;
            state.storedData = null;
        },
        setProfileImage: (state: ReduxInitialStateManage, action: PayloadAction<{ profileURL: string }>) => {
            localStorage.setItem("profileURL", action.payload.profileURL);
            state.profileURL = action.payload.profileURL;

        },
        updateDetails: (state: ReduxInitialStateManage, action: PayloadAction<IInterviewer>) => {
            state.storedData = action.payload; // Assign interviewer data directly
            localStorage.setItem("interviewer", JSON.stringify(action.payload));
            state.change = true;
        }

    }
});

export const { loginSuccess, logout, setProfileImage, updateDetails } = interviewerAuthSlice.actions;
export default interviewerAuthSlice.reducer;
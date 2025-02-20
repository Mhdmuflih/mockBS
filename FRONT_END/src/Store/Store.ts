import { configureStore } from "@reduxjs/toolkit";
import interviewerAuth from "./Slice/InterviewerSlice";
import adminAuth from "./Slice/AdminSlice";
import candidateAuth from "./Slice/CandidateSlice";

const store = configureStore({
    reducer: {
        adminAuth: adminAuth,
        candidateAuth: candidateAuth,
        interviewerAuth: interviewerAuth
    }
});

export default store;
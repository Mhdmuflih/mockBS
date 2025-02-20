import { Route, Routes } from "react-router-dom";
import CandidateLogin from "../Pages/Candidate/Login/CandidateLogin";
import CandidateSignup from "../Pages/Candidate/Signup/CandidateSignup";
import CandidateOtp from "../Pages/Candidate/OTP/CandidateOtp";
import CandidateHome from "../Pages/Candidate/Home/CandidateHome";
import CandidateLoginProtector from "../RouterProtector/CandidateLoginProtector";
import CandidateRouteProtector from "../RouterProtector/CandidateRouteProtector";
import CandidateForgotPassword from "../Pages/Candidate/ForgotPassword/CandidateForgotPassword";
import CandidateChangePassword from "../Pages/Candidate/ChangePassword/CandidateChangePassword";
import CandidateProfile from "../Pages/Candidate/Profile/CandidateProfile";
import CandidateProfileChangePassword from "../Pages/Candidate/ProfileChangePassword/CandidateProfileChangePassword";
import SearchedInterviewerDetails from "../Pages/Candidate/Home/SearchedInterviewerDetails";
import CandidateInterviews from "../Pages/Candidate/Interviews/CandidateInterviews";
import CandidateAnalytics from "../Pages/Candidate/Analytics/CandidateAnalytics";
import CandidateChooseCommunity from "../Pages/Candidate/Community/CandidateChooseCommunity";

const CandidateRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<CandidateLoginProtector />}>
                    <Route path="/login" element={<CandidateLogin />}></Route>
                    <Route path="/sign-up" element={<CandidateSignup />}></Route>
                    <Route path="/otp" element={<CandidateOtp />}></Route>
                    <Route path="/forgot-password" element={<CandidateForgotPassword />}></Route>
                    <Route path="/change-password" element={<CandidateChangePassword />}></Route>
                </Route>
                <Route element={<CandidateRouteProtector />}>
                    <Route path="/home" element={<CandidateHome />}></Route>
                    <Route path="/interviewer-slot-details/:interviewerId" element={<SearchedInterviewerDetails />} ></Route> 

                    <Route path="/profile" element={<CandidateProfile />}></Route>

                    <Route path="/outsourced-interviews" element={<CandidateInterviews />}></Route>
                    <Route path="/analytics" element={<CandidateAnalytics />}></Route>
                    <Route path="/community-chat" element={<CandidateChooseCommunity />}></Route>
                    
                    <Route path="/password" element={<CandidateProfileChangePassword />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default CandidateRoutes;

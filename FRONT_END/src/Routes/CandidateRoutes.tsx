import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";


                    // imported Pages
                // =====================
// protected Routes
// --------------------
import CandidateLoginProtector from "../RouterProtector/CandidateLoginProtector";
import CandidateRouteProtector from "../RouterProtector/CandidateRouteProtector";
import Loading from "../components/Loading";
import PageLoading from "../components/PageLoading";

// -----------------------------------------------------------------------------------------------------
const CandidateLogin = lazy(() => import("../Pages/Candidate/Login/CandidateLogin"));
const CandidateSignup = lazy(() => import("../Pages/Candidate/Signup/CandidateSignup"));
const CandidateOtp = lazy(() => import("../Pages/Candidate/OTP/CandidateOtp"));
const CandidateHome = lazy(() => import("../Pages/Candidate/Home/CandidateHome"));
const CandidateForgotPassword = lazy(() => import("../Pages/Candidate/ForgotPassword/CandidateForgotPassword"));
const CandidateChangePassword = lazy(() => import("../Pages/Candidate/ChangePassword/CandidateChangePassword"));
const CandidateProfile = lazy(() => import("../Pages/Candidate/Profile/CandidateProfile"));
const CandidateProfileChangePassword = lazy(() => import("../Pages/Candidate/ProfileChangePassword/CandidateProfileChangePassword"));
const SearchedInterviewerDetails = lazy(() => import("../Pages/Candidate/Home/SearchedInterviewerDetails"));
const CandidateInterviews = lazy(() => import("../Pages/Candidate/Interviews/CandidateInterviews"));
const CandidateAnalytics = lazy(() => import("../Pages/Candidate/Analytics/CandidateAnalytics"));
const CandidateChooseCommunity = lazy(() => import("../Pages/Candidate/Community/CandidateChooseCommunity"));
const CandidateInterviewDetails = lazy(() => import("../Pages/Candidate/Interviews/CandidateInterviewDetails"));
const SuccessPayment = lazy(() => import("../Pages/Candidate/SuccessPayment/SuccessPayment"));
const PremiumSuccessPayment = lazy(() => import("../Pages/Candidate/SuccessPayment/PremiumSuccessPayment"));
const CandidateVideoCall = lazy(() => import("../Pages/Candidate/VideoCall/CandidateVideoCall"));
const CandidatePageNotFound = lazy(() => import("../Pages/404 Page Not Found/CandidatePageNotFound"));
// ---------------------------------------------------------------------------------------------------------------------------

// import CandidateLogin from "../Pages/Candidate/Login/CandidateLogin";
// import CandidateSignup from "../Pages/Candidate/Signup/CandidateSignup";
// import CandidateOtp from "../Pages/Candidate/OTP/CandidateOtp";
// import CandidateHome from "../Pages/Candidate/Home/CandidateHome";
// import CandidateLoginProtector from "../RouterProtector/CandidateLoginProtector";
// import CandidateRouteProtector from "../RouterProtector/CandidateRouteProtector";
// import CandidateForgotPassword from "../Pages/Candidate/ForgotPassword/CandidateForgotPassword";
// import CandidateChangePassword from "../Pages/Candidate/ChangePassword/CandidateChangePassword";
// import CandidateProfile from "../Pages/Candidate/Profile/CandidateProfile";
// import CandidateProfileChangePassword from "../Pages/Candidate/ProfileChangePassword/CandidateProfileChangePassword";
// import SearchedInterviewerDetails from "../Pages/Candidate/Home/SearchedInterviewerDetails";
// import CandidateInterviews from "../Pages/Candidate/Interviews/CandidateInterviews";
// import CandidateAnalytics from "../Pages/Candidate/Analytics/CandidateAnalytics";
// import CandidateChooseCommunity from "../Pages/Candidate/Community/CandidateChooseCommunity";
// import CandidateInterviewDetails from "../Pages/Candidate/Interviews/CandidateInterviewDetails";
// import SuccessPayment from "../Pages/Candidate/SuccessPayment/SuccessPayment";
// import CandidateVideoCall from "../Pages/Candidate/VideoCall/CandidateVideoCall";
// import CandidatePageNotFound from "../Pages/404 Page Not Found/CandidatePageNotFound";
// import FailedPayment from "../Pages/Candidate/PaymentFailed/FailedPayment";

const CandidateRoutes = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>

                <Routes>
                    {/* login protected */}
                    <Route element={<CandidateLoginProtector />}>
                        <Route path="/login" element={<CandidateLogin />}></Route>
                        <Route path="/sign-up" element={<CandidateSignup />}></Route>
                        <Route path="/otp" element={<CandidateOtp />}></Route>
                        <Route path="/forgot-password" element={<CandidateForgotPassword />}></Route>
                        <Route path="/change-password" element={<CandidateChangePassword />}></Route>
                        <Route path="/loading" element={<PageLoading />}></Route>
                    </Route>

                    {/* Route protected */}
                    <Route element={<CandidateRouteProtector />}>
                        <Route path="/home" element={<CandidateHome />}></Route>
                        <Route path="/interviewer-slot-details/:interviewerId" element={<SearchedInterviewerDetails />} ></Route>

                        <Route path="/profile" element={<CandidateProfile />}></Route>

                        <Route path="/outsourced-interviews" element={<CandidateInterviews />}></Route>
                        <Route path="/outsourced-interviews/:id" element={<CandidateInterviewDetails />}></Route>

                        <Route path="/video-call/:scheduleId" element={<CandidateVideoCall />}></Route>

                        <Route path="/analytics" element={<CandidateAnalytics />}></Route>
                        <Route path="/community-chat" element={<CandidateChooseCommunity />}></Route>

                        <Route path="/password" element={<CandidateProfileChangePassword />}></Route>

                        <Route path="/payment-status" element={<SuccessPayment />}></Route>
                        <Route path="/premium-payment-status" element={<PremiumSuccessPayment />}></Route>
                    </Route>

                    {/* Page not found */}
                    <Route path="*" element={<CandidatePageNotFound />}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default CandidateRoutes;

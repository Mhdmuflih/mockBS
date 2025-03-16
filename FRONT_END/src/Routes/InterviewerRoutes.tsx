import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';


                        // imported pages
                    // ===================
// Protected Routes
// ----------------------
import InterviewerLoginProtector from '../RouterProtector/InterviewerLoginProtector';
import InterviewerRouteProtector from '../RouterProtector/InterviewerRouteProtector';
// ----------------------------------------------------------------------------------------------------------------
const InterviewerSignup = lazy(() => import("../Pages/Interviewer/Signup/InterviewerSignup"));
const InterviewerLogin = lazy(() => import("../Pages/Interviewer/Login/InterviewerLogin"));
const InterviewerOtp = lazy(() => import("../Pages/Interviewer/OTP/InterviewerOtp"));
const InterviewerProfile = lazy(() => import("../Pages/Interviewer/Profile/InterviewerProfile"));
const InterviewerDetails = lazy(() => import("../Pages/Interviewer/InterviewerDetails/InterviewerDetails"));
const InterviewerForgotPassword = lazy(() => import("../Pages/Interviewer/ForgotPassword/InterviewerForgotPassword"));
const InterviewerChangePassword = lazy(() => import("../Pages/Interviewer/ChangePassword/InterviewerChangePassword"));
const InterviewerProfileChangePassword = lazy(() => import("../Pages/Interviewer/ProfileChangePassword/InterviewerProfileChangePassword"));
const InterviewerSlots = lazy(() => import("../Pages/Interviewer/Slots/InterviewerSlots"));
const InterviewerAddSlot = lazy(() => import("../Pages/Interviewer/Slots/InterviewerAddSlot"));
const InterviewerScheduled = lazy(() => import("../Pages/Interviewer/ScheduleInterviews/InterviewerScheduled"));
const InterviewerPayment = lazy(() => import("../Pages/Interviewer/Payment/InterviewerPayment"));
const InterviewerInterviewDetails = lazy(() => import("../Pages/Interviewer/ScheduleInterviews/InterviewerInterviewDetails"));
const InterviewerVideoCall = lazy(() => import("../Pages/Interviewer/VideoCall/InterviewerVideoCall"));
const InterviewerPageNotFound = lazy(() => import("../Pages/404 Page Not Found/InterviewerPageNotFound"));
// ----------------------------------------------------------------------------------------------------------------------------------------

// import InterviewerSignup from '../Pages/Interviewer/Signup/InterviewerSignup';
// import InterviewerLogin from '../Pages/Interviewer/Login/InterviewerLogin';
// import InterviewerLoginProtector from '../RouterProtector/InterviewerLoginProtector';
// import InterviewerRouteProtector from '../RouterProtector/InterviewerRouteProtector';
// import InterviewerOtp from '../Pages/Interviewer/OTP/InterviewerOtp';
// import InterviewerProfile from '../Pages/Interviewer/Profile/InterviewerProfile';
// import InterviewerDetails from '../Pages/Interviewer/InterviewerDetails/InterviewerDetails';
// import InterviewerForgotPassword from '../Pages/Interviewer/ForgotPassword/InterviewerForgotPassword';
// import InterviewerChangePassword from '../Pages/Interviewer/ChangePassword/InterviewerChangePassword';
// import InterviewerProfileChangePassword from '../Pages/Interviewer/ProfileChangePassword/InterviewerProfileChangePassword';
// import InterviewerSlots from '../Pages/Interviewer/Slots/InterviewerSlots';
// import InterviewerAddSlot from '../Pages/Interviewer/Slots/InterviewerAddSlot';
// import InterviewerScheduled from '../Pages/Interviewer/ScheduleInterviews/InterviewerScheduled';
// import InterviewerPayment from '../Pages/Interviewer/Payment/InterviewerPayment';
// import InterviewerInterviewDetails from '../Pages/Interviewer/ScheduleInterviews/InterviewerInterviewDetails';
// import InterviewerVideoCall from '../Pages/Interviewer/VideoCall/InterviewerVideoCall';
// import InterviewerPageNotFound from '../Pages/404 Page Not Found/InterviewerPageNotFound';

const InterviewerRoutes = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>

                <Routes>

                    {/* Login Protected */}
                    <Route element={<InterviewerLoginProtector />}>
                        <Route path="/sign-up" element={<InterviewerSignup />}></Route>
                        <Route path="/login" element={<InterviewerLogin />}></Route>
                        <Route path='/otp' element={<InterviewerOtp />}></Route>
                        <Route path='/forgot-password' element={<InterviewerForgotPassword />}></Route>
                        <Route path='/change-password' element={<InterviewerChangePassword />}></Route>
                    </Route>

                    {/* Route Protected */}
                    <Route element={<InterviewerRouteProtector />}>
                        <Route path="/details" element={<InterviewerDetails />}></Route>
                        <Route path='/profile' element={<InterviewerProfile />}></Route>
                        <Route path='/password' element={<InterviewerProfileChangePassword />}></Route>

                        <Route path='/slot' element={<InterviewerSlots />}></Route>
                        <Route path='/add-slot' element={<InterviewerAddSlot />}></Route>

                        <Route path='/scheduled' element={<InterviewerScheduled />}></Route>
                        <Route path='/scheduled/:id' element={<InterviewerInterviewDetails />}></Route>

                        <Route path='/video-call/:scheduleId' element={<InterviewerVideoCall />}></Route>

                        <Route path='/payment' element={<InterviewerPayment />}></Route>
                    </Route>

                    {/* Page Not found */}
                    <Route path='*' element={<InterviewerPageNotFound />}></Route>
                </Routes>
            </Suspense>
        </>
    )
}

export default InterviewerRoutes;

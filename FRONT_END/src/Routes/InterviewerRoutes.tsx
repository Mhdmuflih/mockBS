import { Route, Routes } from 'react-router-dom';
import InterviewerSignup from '../Pages/Interviewer/Signup/InterviewerSignup';
import InterviewerLogin from '../Pages/Interviewer/Login/InterviewerLogin';
// import InterviewerHome from '../Pages/Interviewer/Home/InterviewerHome';
import InterviewerLoginProtector from '../RouterProtector/InterviewerLoginProtector';
import InterviewerRouteProtector from '../RouterProtector/InterviewerRouteProtector';
import InterviewerOtp from '../Pages/Interviewer/OTP/InterviewerOtp';
import InterviewerProfile from '../Pages/Interviewer/Profile/InterviewerProfile';
import InterviewerDetails from '../Pages/Interviewer/InterviewerDetails/InterviewerDetails';
import InterviewerForgotPassword from '../Pages/Interviewer/ForgotPassword/InterviewerForgotPassword';
import InterviewerChangePassword from '../Pages/Interviewer/ChangePassword/InterviewerChangePassword';
import InterviewerProfileChangePassword from '../Pages/Interviewer/ProfileChangePassword/InterviewerProfileChangePassword';
import InterviewerSlots from '../Pages/Interviewer/Slots/InterviewerSlots';
import InterviewerAddSlot from '../Pages/Interviewer/Slots/InterviewerAddSlot';
import InterviewerScheduled from '../Pages/Interviewer/ScheduleInterviews/InterviewerScheduled';
import InterviewerPayment from '../Pages/Interviewer/Payment/InterviewerPayment';

const InterviewerRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<InterviewerLoginProtector />}>
                    <Route path="/sign-up" element={<InterviewerSignup />}></Route>
                    <Route path="/login" element={<InterviewerLogin />}></Route>
                    <Route path='/otp' element={<InterviewerOtp />}></Route>
                    <Route path='/forgot-password' element={<InterviewerForgotPassword />}></Route>
                    <Route path='/change-password' element={<InterviewerChangePassword />}></Route>
                </Route>
                <Route element={<InterviewerRouteProtector />}>
                    <Route path="/details" element={<InterviewerDetails />}></Route>
                    <Route path='/profile' element={<InterviewerProfile />}></Route>
                    <Route path='/password' element={<InterviewerProfileChangePassword />}></Route>

                    <Route path='/slot' element={<InterviewerSlots />}></Route>
                    <Route path='/add-slot' element={<InterviewerAddSlot />}></Route>

                    <Route path='/scheduled' element={<InterviewerScheduled />}></Route>

                    <Route path='/payment' element={<InterviewerPayment />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default InterviewerRoutes;

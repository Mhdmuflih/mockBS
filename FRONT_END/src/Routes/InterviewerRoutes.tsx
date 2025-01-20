import { Route, Routes } from 'react-router-dom';
import InterviewerSignup from '../Pages/Interviewer/Signup/InterviewerSignup';
import InterviewerLogin from '../Pages/Interviewer/Login/InterviewerLogin';
// import InterviewerHome from '../Pages/Interviewer/Home/InterviewerHome';
import InterviewerLoginProtector from '../RouterProtector/InterviewerLoginProtector';
import InterviewerRouteProtector from '../RouterProtector/InterviewerRouteProtector';
import InterviewerOtp from '../Pages/Interviewer/OTP/InterviewerOtp';
import InterviewerProfile from '../Pages/Interviewer/Profile/InterviewerProfile';
import InterviewerDetails from '../Pages/Interviewer/InterviewerDetails/InterviewerDetails';

const InterviewerRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<InterviewerLoginProtector />}>
                    <Route path="/sign-up" element={<InterviewerSignup />}></Route>
                    <Route path="/login" element={<InterviewerLogin />}></Route>
                    <Route path='/otp' element={<InterviewerOtp />}></Route>
                </Route>
                <Route element={<InterviewerRouteProtector />}>
                    <Route path="/details" element={<InterviewerDetails />}></Route>
                    <Route path='/profile' element={<InterviewerProfile />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default InterviewerRoutes;

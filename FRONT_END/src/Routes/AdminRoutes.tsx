import { Route, Routes } from 'react-router-dom';
import AdminSignup from '../Pages/Admin/Signup/AdminSignup';
import AdminLogin from '../Pages/Admin/Login/AdminLogin';
import AdminOtp from '../Pages/Admin/OTP/AdminOtp';
import AdminDashboard from '../Pages/Admin/Dashboard/AdminDashboard';
import AdminLoginProtector from '../RouterProtector/AdminLoginProtector';
import AdminRouteProtector from '../RouterProtector/AdminRouteProtector';
import AdminApproval from '../Pages/Admin/Approval/AdminApproval';
import AdminInterviewersList from '../Pages/Admin/Interviewers/AdminInterviewersList';
import AdminCandidatesList from '../Pages/Admin/Candidates/AdminCandidatesList';
import AdminApprovalDetail from '../Pages/Admin/Approval/AdminApprovalDetail';
import AdminCandidateDetails from '../Pages/Admin/Candidates/AdminCandidateDetails';
import AdminStackList from '../Pages/Admin/Stack/AdminStackList';
import AdminAddStack from '../Pages/Admin/Stack/AdminAddStack';
import AdminInterviewerDetails from '../Pages/Admin/Interviewers/AdminInterviewerDetails';
import AdminInterviewList from '../Pages/Admin/Interviews/AdminInterviewList';
import AdminCommunityList from '../Pages/Admin/Communities/AdminCommunityList';

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<AdminLoginProtector />}>
                    <Route path="/sign-up" element={<AdminSignup />}></Route>
                    <Route path="/login" element={<AdminLogin />}></Route>
                    <Route path='/otp' element={<AdminOtp />}></Route>
                </Route>
                <Route element={<AdminRouteProtector />}>
                    <Route path='/dashboard' element={<AdminDashboard />}></Route>
                    <Route path='/approval' element={<AdminApproval />}></Route>
                    <Route path='/approval-details/:id' element={<AdminApprovalDetail />}></Route>

                    <Route path='/interviewers' element={<AdminInterviewersList />}></Route>
                    <Route path='/interviewer/:id' element={<AdminInterviewerDetails />}></Route>

                    <Route path='/candidates' element={<AdminCandidatesList />}></Route>
                    <Route path='/candidate/:id' element={<AdminCandidateDetails />}></Route>
                    
                    <Route path='/interviews' element={<AdminInterviewList />}></Route>

                    <Route path='/stack' element={<AdminStackList />}></Route>
                    <Route path='/add-stack' element={<AdminAddStack />}></Route>

                    <Route path='/communities' element={<AdminCommunityList />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default AdminRoutes;

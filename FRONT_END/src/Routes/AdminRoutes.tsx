import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Imported Pages
// ====================
// Route Protected
// --------------------
import AdminLoginProtector from '../RouterProtector/AdminLoginProtector';
import AdminRouteProtector from '../RouterProtector/AdminRouteProtector';
// ----------------------------------------------------------------------------------------------------------
const AdminSignup = lazy(() => import('../Pages/Admin/Signup/AdminSignup'));
const AdminLogin = lazy(() => import('../Pages/Admin/Login/AdminLogin'));
const AdminOtp = lazy(() => import('../Pages/Admin/OTP/AdminOtp'));
const AdminDashboard = lazy(() => import('../Pages/Admin/Dashboard/AdminDashboard'));
const AdminApproval = lazy(() => import('../Pages/Admin/Approval/AdminApproval'));
const AdminInterviewersList = lazy(() => import('../Pages/Admin/Interviewers/AdminInterviewersList'));
const AdminCandidatesList = lazy(() => import('../Pages/Admin/Candidates/AdminCandidatesList'));
const AdminApprovalDetail = lazy(() => import('../Pages/Admin/Approval/AdminApprovalDetail'));
const AdminCandidateDetails = lazy(() => import('../Pages/Admin/Candidates/AdminCandidateDetails'));
const AdminStackList = lazy(() => import('../Pages/Admin/Stack/AdminStackList'));
const AdminAddStack = lazy(() => import('../Pages/Admin/Stack/AdminAddStack'));
const AdminInterviewerDetails = lazy(() => import('../Pages/Admin/Interviewers/AdminInterviewerDetails'));
const AdminInterviewList = lazy(() => import('../Pages/Admin/Interviews/AdminInterviewList'));
const AdminCommunityList = lazy(() => import('../Pages/Admin/Communities/AdminCommunityList'));
const AdminInterviewDetails = lazy(() => import('../Pages/Admin/Interviews/AdminInterviewDetails'));
// ---------------------------------------------------------------------------------------------------------------------
// import AdminSignup from '../Pages/Admin/Signup/AdminSignup';
// import AdminLogin from '../Pages/Admin/Login/AdminLogin';
// import AdminOtp from '../Pages/Admin/OTP/AdminOtp';
// import AdminLoginProtector from '../RouterProtector/AdminLoginProtector';
// import AdminRouteProtector from '../RouterProtector/AdminRouteProtector';
// import AdminDashboard from '../Pages/Admin/Dashboard/AdminDashboard';
// import AdminApproval from '../Pages/Admin/Approval/AdminApproval';
// import AdminInterviewersList from '../Pages/Admin/Interviewers/AdminInterviewersList';
// import AdminCandidatesList from '../Pages/Admin/Candidates/AdminCandidatesList';
// import AdminApprovalDetail from '../Pages/Admin/Approval/AdminApprovalDetail';
// import AdminCandidateDetails from '../Pages/Admin/Candidates/AdminCandidateDetails';
// import AdminStackList from '../Pages/Admin/Stack/AdminStackList';
// import AdminAddStack from '../Pages/Admin/Stack/AdminAddStack';
// import AdminInterviewerDetails from '../Pages/Admin/Interviewers/AdminInterviewerDetails';
// import AdminInterviewList from '../Pages/Admin/Interviews/AdminInterviewList';
// import AdminCommunityList from '../Pages/Admin/Communities/AdminCommunityList';
// import AdminInterviewDetails from '../Pages/Admin/Interviews/AdminInterviewDetails';

const AdminRoutes = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>

                <Routes>

                    {/* Login Protected */}
                    <Route element={<AdminLoginProtector />}>
                        <Route path="/sign-up" element={<AdminSignup />}></Route>
                        <Route path="/login" element={<AdminLogin />}></Route>
                        <Route path='/otp' element={<AdminOtp />}></Route>
                    </Route>

                    {/* Route Protected */}
                    <Route element={<AdminRouteProtector />}>
                        <Route path='/dashboard' element={<AdminDashboard />}></Route>
                        <Route path='/approval' element={<AdminApproval />}></Route>
                        <Route path='/approval-details/:id' element={<AdminApprovalDetail />}></Route>

                        <Route path='/interviewers' element={<AdminInterviewersList />}></Route>
                        <Route path='/interviewer/:id' element={<AdminInterviewerDetails />}></Route>

                        <Route path='/candidates' element={<AdminCandidatesList />}></Route>
                        <Route path='/candidate/:id' element={<AdminCandidateDetails />}></Route>

                        <Route path='/interviews' element={<AdminInterviewList />}></Route>
                        <Route path='/interviews/:id' element={<AdminInterviewDetails />}></Route>

                        <Route path='/stack' element={<AdminStackList />}></Route>
                        <Route path='/add-stack' element={<AdminAddStack />}></Route>

                        <Route path='/communities' element={<AdminCommunityList />}></Route>
                    </Route>

                    {/* Page Not Found */}

                </Routes>
            </Suspense>
        </>
    )
}

export default AdminRoutes;

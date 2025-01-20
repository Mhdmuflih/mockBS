import { Route, Routes } from 'react-router-dom';
import AdminSignup from '../Pages/Admin/Signup/AdminSignup';
import AdminLogin from '../Pages/Admin/Login/AdminLogin';
import AdminOtp from '../Pages/Admin/OTP/AdminOtp';
import AdminDashboard from '../Pages/Admin/Dashboard/AdminDashboard';
import AdminLoginProtector from '../RouterProtector/AdminLoginProtector';
import AdminRouteProtector from '../RouterProtector/AdminRouteProtector';

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
                </Route>
            </Routes>
        </>
    )
}

export default AdminRoutes;

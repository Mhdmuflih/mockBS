import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRouteProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.adminAuth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/admin/login');
        }
    }, []);

    return (
        isLoggedIn ? <Outlet /> : null
    )
}

export default AdminRouteProtector;

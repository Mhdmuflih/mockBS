import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AdminLoginProtector = () => {

    const isLoggedIn = useSelector((state: any) => state.adminAuth.isLoggedIn);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkAuthStatus = async () => {
            console.log("Is LoggedIn route Protector", isLoggedIn);
            if (isLoggedIn) {
                navigate('/admin/dashboard');
            }
            setLoading(false);
        }
        checkAuthStatus();
    }, [isLoggedIn, navigate]);

    if (loading) {
        return <div> <Loading/> </div>
    }

    return (
        !isLoggedIn ? <Outlet /> : null
    )
}

export default AdminLoginProtector;

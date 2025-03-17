// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../../Store/Slice/AdminSlice";
import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import AdminSideLoading from "../../../components/Admin/AdminSideLoading";

const AdminDashboard = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { isLoggedIn } = useSelector((state: any) => state.adminAuth);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    // const handleToLogout = () => {
    //     dispatch(logout());
    //     navigate('/admin/login');
    // };

    if(isLoading) {
        return <div><AdminSideLoading /></div>
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <SideBar heading="Dashboard" >
                <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 h-[476px]">

                </div>
            </SideBar>
        </div>
    );
};

export default AdminDashboard;

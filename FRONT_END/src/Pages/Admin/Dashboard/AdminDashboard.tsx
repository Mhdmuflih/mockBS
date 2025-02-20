// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../../Store/Slice/AdminSlice";
import SideBar from "../../../components/Admin/SideBar";

const AdminDashboard = () => {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { isLoggedIn } = useSelector((state: any) => state.adminAuth);

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate('/admin/login');
    //     }
    // }, [isLoggedIn, navigate]);

    // const handleToLogout = () => {
    //     dispatch(logout());
    //     navigate('/admin/login');
    // };

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

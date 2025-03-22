import { ReactNode, useEffect, useState } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slice/AdminSlice";
import logo from "../../assets/Creative Logo Templates.jpeg"



import { RxDashboard } from "react-icons/rx";
import { FcApproval } from "react-icons/fc";
import { FaUsersGear } from "react-icons/fa6";
import { SiGooglemeet } from "react-icons/si";
import { BsStack } from "react-icons/bs";
import { RiLogoutCircleFill, RiUserCommunityFill } from "react-icons/ri";





interface sideBarProps {
    heading: string;
    children?: ReactNode;
}


const SideBar = (props: sideBarProps) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn } = useSelector((state: any) => state.adminAuth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/admin/login');
        }
    }, [isLoggedIn, navigate]);

    const handleToLogout = () => {
        dispatch(logout());
        navigate('/admin/login');
    };



    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleToLogo = () => {
        navigate('/admin/dashboard');
    }

    return (
        <>
            <div className="bg-black h-screen flex">
                <div className=" bg-[#30323A] h-[450px] w-52 p-4 ml-1 mt-2 rounded-xl">
                    <div className=" w-14 ml-16 mt-2">
                        <img onClick={handleToLogo} src={logo} alt="Company Logo" className="h-12 mr-4 hover:cursor-pointer" /> 
                    </div>
                    <h2 className="text-center font-bold mt-1 text-white">mock BS</h2>

                    {/* side bar start */}

                    <div className="pt-2">
                        <ul className="space-y-4">
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/dashboard" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/dashboard");
                                        navigate("/admin/dashboard");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RxDashboard />
                                    </span>
                                    <span >Dashboard</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/approval" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/approval");
                                        navigate("/admin/approval");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FcApproval />
                                    </span>
                                    <span >Approval</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviewers" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviewers");
                                        navigate("/admin/interviewers");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaUsersGear />
                                    </span>
                                    <span >All Interviewers</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/candidates" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/candidates");
                                        navigate("/admin/candidates");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaUsers />
                                    </span>
                                    <span >Candidates</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviews" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviews");
                                        navigate("/admin/interviews");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <SiGooglemeet />
                                    </span>
                                    <span >Interviews</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/stack" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/stack");
                                        navigate("/admin/stack");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <BsStack />
                                    </span>
                                    <span >Stack</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/communities" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/communitiess");
                                        navigate("/admin/communities");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiUserCommunityFill />
                                    </span>
                                    <span >Communities</span>
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/payment-details" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/payment-details");
                                        navigate("/admin/payment-details");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiUserCommunityFill />
                                    </span>
                                    <span >Payment</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* New div outside sidebar but positioned at the bottom */}
                    <div className="absolute bottom-4 left-1 w-52 p-4 bg-[#30323A] text-white text-center rounded-xl">
                        <ul className="space-y-2">
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/profile");
                                        navigate("/admin/profile");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    <span >Admin</span>
                                </div>
                            </li>

                            <li>
                                <div className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "/admin/home" ? "bg-white text-black" : ""}`}
                                    onClick={handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiLogoutCircleFill />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Heading heading={props.heading} children={props.children} />


        </>
    )
}

export default SideBar;

import { ReactNode, useEffect, useState } from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slice/AdminSlice";
import logo from "../../assets/Creative Logo Templates.jpeg"



import { RxDashboard } from "react-icons/rx";
import { FcApproval, FcMoneyTransfer } from "react-icons/fc";
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
    const [isOpen, setIsOpen] = useState(false);
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
            <div className="flex flex-1">

                {/* Side Bar */}
                <div
                    className={` p-4 bg-gray-800 transition-all duration-300 ${isOpen ? 'w-52' : 'w-20'}`}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mt-3" onClick={() => setIsOpen(true)}>
                        <img onClick={handleToLogo} src={logo} alt="Company Logo" className={` transition-all ${isOpen ? 'rounded-2xl w-24 h-24' : ' rounded-full w-12 h-12'}`}
                        />
                    </div>

                    <h2 className="text-center font-bold mt-1 text-white">mock BS</h2>

                    {/* side bar start */}

                    <div className="pt-2">
                        <ul className={`mt-7 ${isOpen ? 'space-y-3' : 'space-y-5'}`}>
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/dashboard" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/dashboard");
                                        navigate("/admin/dashboard");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RxDashboard />
                                    </span>
                                    {isOpen && <span >Dashboard</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/approval" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/approval");
                                        navigate("/admin/approval");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FcApproval />
                                    </span>
                                    {isOpen && <span >Approval</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviewers" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviewers");
                                        navigate("/admin/interviewers");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaUsersGear />
                                    </span>
                                    {isOpen && <span >All Interviewers</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/candidates" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/candidates");
                                        navigate("/admin/candidates");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaUsers />
                                    </span>
                                    {isOpen && <span >Candidates</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/interviews" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/interviews");
                                        navigate("/admin/interviews");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <SiGooglemeet />
                                    </span>
                                    {isOpen && <span >Interviews</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/stack" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/stack");
                                        navigate("/admin/stack");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <BsStack />
                                    </span>
                                    {isOpen && <span >Stack</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/communities" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/communitiess");
                                        navigate("/admin/communities");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiUserCommunityFill />
                                    </span>
                                    {isOpen && <span >Communities</span>}
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/payment-details" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/payment-details");
                                        navigate("/admin/payment-details");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FcMoneyTransfer />
                                    </span>
                                    {isOpen && <span >Payment</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/admin/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/admin/profile");
                                        navigate("/admin/profile");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <FaHome />
                                    </span>
                                    {isOpen && <span >Admin</span>}
                                </div>
                            </li>

                            <li>
                                <div className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "/admin/home" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        handleToLogout
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-3">
                                        <RiLogoutCircleFill />
                                    </span>
                                    {isOpen && <span>Logout</span>}
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

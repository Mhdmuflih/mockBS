import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../TopBar";
import { ReactNode, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCheckToSlot } from "react-icons/fa6";
import { RiCalendarScheduleFill, RiLogoutCircleFill } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { GoShieldLock } from "react-icons/go";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slice/InterviewerSlice";

interface IsideBarProps {
    heading: string;
    children?: ReactNode;
}



const SideBar = (props: IsideBarProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleToLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <TopBar />

            <div className="flex">


                {/* Side Bar */}
                <div className="sidebar bg-[#30323A] h-[500px] w-52 p-4 ml-3 mt-3 rounded-2xl">
                    <div className="bg-white  w-24 h-24 ml-10 mt-5">
                        <img src="" alt="" /> 
                    </div>

                    <div className="pt-2">
                        <ul className="space-y-5">

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/interviewer/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/profile");
                                        navigate("/interviewer/profile");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <CgProfile />
                                    </span>
                                    <span>Profile</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/interviewer/slot" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/slot");
                                        navigate("/interviewer/slot");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FaCheckToSlot />
                                    </span>
                                    <span>Slots</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/interviewer/scheduled" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/scheduled");
                                        navigate("/interviewer/scheduled");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <RiCalendarScheduleFill />
                                    </span>
                                    <span>Scheduled</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/interviewer/payment" ? "bg-white text-black" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/payment");
                                        navigate("/interviewer/payment");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <FcMoneyTransfer />
                                    </span>
                                    <span>Payments</span>
                                </div>
                            </li>


                            {/* logout button */}
                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                ${activePath === "/interviewer/password" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/password");
                                        navigate("/interviewer/password");
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <GoShieldLock />
                                    </span>
                                    <span>Change Password</span>
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group 
                                ${activePath === "candidate/home" ? "bg-[#999999]" : ""}`}
                                    onClick={handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200">
                                        <RiLogoutCircleFill />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Heading Section */}
                    <div className="bg-[#181A22] mt-3 ml-1 rounded-t-lg p-5">
                        <h1 className="text-2xl font-bold text-white">{props.heading}</h1>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar;

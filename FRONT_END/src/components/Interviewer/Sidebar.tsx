import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../TopBar";
import { ReactNode, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCheckToSlot } from "react-icons/fa6";
import { RiCalendarScheduleFill, RiLogoutCircleFill } from "react-icons/ri";
import { FcMoneyTransfer } from "react-icons/fc";
import { GoShieldLock } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Slice/InterviewerSlice";
import Heading from "./Heading";
import profileImageDemo from "../../assets/profile image.jpg"

interface IsideBarProps {
    heading: string;
    subHeading?: string;
    children?: ReactNode;
    addButton?: string;
    checkApproved?: boolean
}



const SideBar = (props: IsideBarProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState();



    const { isLoggedIn, profileURL } = useSelector((state: any) => state.interviewerAuth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/interviewer/login");
        } else {
            setProfileImage(profileURL);
        }
    }, [isLoggedIn, navigate, profileURL]);



    const handleToLogout = () => {
        dispatch(logout());
        navigate('/');
    }


    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <>
            <TopBar />

            <div className="flex">

                {/* Side Bar */}
                <div className="sidebar bg-[#30323A] h-[500px] w-52 p-4 ml-3 mt-3 rounded-2xl">
                    <div className="bg-white  w-24 h-24 ml-10 mt-5">
                        <img src={props.checkApproved == false ? profileImageDemo : profileImage} alt="" className="h-24 w-24" />
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
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                        ${activePath === "/interviewer/slot" ? "bg-[#999999]" : ""}`}
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
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                ${activePath === "/interviewer/scheduled" ? "bg-[#999999]" : ""}`}
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
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                ${activePath === "/interviewer/payment" ? "bg-[#999999]" : ""}`}
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
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
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

                <Heading heading={props.heading} children={props.children} addButton={props.addButton} subHeading={props.subHeading} />

            </div>
        </>
    )
}

export default SideBar;

import { useLocation, useNavigate } from "react-router-dom";
// import TopBar from "../TopBar";
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
    const [isOpen, setIsOpen] = useState(false);
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
            {/* <TopBar /> */}

            <div className="flex flex-1">

                {/* Side Bar */}
                <div
                    className={` p-4 bg-gray-800 transition-all duration-300 ${isOpen ? 'w-52' : 'w-20'}`}
                    onMouseOver={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                     {/* Profile Image */}
                     <div className="flex flex-col items-center mt-3" onClick={() => setIsOpen(true)}>
                        <img
                            src={profileImage ? profileImage : profileImageDemo}
                            alt="Profile"
                            className={` transition-all ${isOpen ? 'rounded-2xl w-24 h-24' : ' rounded-full w-12 h-12'}`}
                        />
                    </div>

                    <div className="pt-2">
                    <ul className={`mt-7 ${isOpen? 'space-y-5' : 'space-y-10'}`}>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group 
                                        ${activePath === "/interviewer/profile" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/profile");
                                        navigate("/interviewer/profile");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <CgProfile />
                                    </span>
                                    {isOpen && <span>Profile</span>}
                                    
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                        ${activePath === "/interviewer/slot" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/slot");
                                        navigate("/interviewer/slot");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <FaCheckToSlot />
                                    </span>
                                    {isOpen && <span>Slots</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                ${activePath === "/interviewer/scheduled" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/scheduled");
                                        navigate("/interviewer/scheduled");
                                        setIsOpen(true)
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <RiCalendarScheduleFill />
                                    </span>
                                    { isOpen && <span>Scheduled</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`${props.checkApproved === false ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50 flex items-center space-x-3  p-2  rounded-lg  transition-all duration-300 group" : "flex items-center space-x-3 text-white p-2 bg-[#000000] rounded-lg cursor-pointer hover:bg-[#999999] transition-all duration-300 group"} 
                                ${activePath === "/interviewer/payment" ? "bg-[#999999]" : ""}`}
                                    onClick={() => {
                                        setActivePath("/interviewer/payment");
                                        navigate("/interviewer/payment");
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <FcMoneyTransfer />
                                    </span>
                                    { isOpen && <span>Payments</span>}
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
                                        setIsOpen(true);
                                    }}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-1">
                                        <GoShieldLock />
                                    </span>
                                    {isOpen && <span>Change Password</span>}
                                </div>
                            </li>

                            <li>
                                <div
                                    className={`flex items-center space-x-3 text-white p-1 bg-[#FF3B30] rounded-lg cursor-pointer hover:bg-[#912626] transition-all duration-300 group`}
                                    onClick={handleToLogout}
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-200 ml-2">
                                        <RiLogoutCircleFill />
                                    </span>
                                    {isOpen && <span>Logout</span>}
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
